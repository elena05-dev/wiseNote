'use client';

import { nextServer } from './api';
import axios from 'axios';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { useAuthStore } from '@/lib/store/authStore';
import type { CreateNoteData } from '@/types/note';
import { FetchNotesParams, FetchNotesResponse } from '@/types/note';

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const { data } = await nextServer.get<User>('/users/me', {
      withCredentials: true, // повторно на всякий случай
    });
    console.log('fetchCurrentUser data:', data); // <-- добавь лог
    useAuthStore.getState().setAuth?.(data);
    return data;
  } catch (error: unknown) {
    console.error('❌ fetchCurrentUser error:', error);
    useAuthStore.getState().clearAuth?.();
    return null;
  }
}
export async function register(email: string, password: string): Promise<User> {
  try {
    const { data } = await nextServer.post<User>('/auth/register', {
      email,
      password,
    });
    useAuthStore.getState().setAuth?.(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error('this email already exists');
    }
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    await nextServer.post('/auth/login', {
      email: email.trim(),
      password: password.trim(),
    });

    const user = await fetchCurrentUser();
    console.log(user);
    if (!user) throw new Error('Failed to fetch user data after login');
    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await nextServer.post('/auth/logout');
  } finally {
    useAuthStore.getState().clearAuth?.();
  }
}

export async function updateUserProfile(updates: Partial<User>): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', updates);
  useAuthStore.getState().setAuth?.(data);
  return data;
}

interface NoteFromServer {
  _id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesApiResponse {
  status: number;
  message: string;
  data: {
    data: NoteFromServer[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNotesClient = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const query = new URLSearchParams();

  if (params.page) query.append('page', String(params.page));
  if (params.perPage) query.append('perPage', String(params.perPage));
  if (params.search) query.append('search', params.search);
  if (params.tag && params.tag !== 'All') query.append('tag', params.tag);

  const res = await fetch(`${API_BASE}/notes?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  const data: NotesApiResponse = await res.json();
  console.log('📦 Ответ от сервера:', data);

  const notes: Note[] = data.data.data.map((note) => ({
    id: note._id,
    title: note.title,
    content: note.content,
    tag: note.tag as Note['tag'],
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  }));

  return {
    notes,
    totalPages: data.data.totalPages,
  };
};

export const getNoteById = async (id: string): Promise<Note> => {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch note with id ${id}`);
  }

  const data = await res.json();

  return {
    id: data._id,
    title: data.title,
    content: data.content,
    tag: data.tag as Note['tag'],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });

  if (!res.ok) {
    throw new Error('Failed to create note');
  }

  const data = await res.json();

  return {
    id: data._id,
    title: data.title,
    content: data.content,
    tag: data.tag as Note['tag'],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const deleteNote = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to delete note');
  }
};

export async function updateNote(id: string, data: Partial<Note>) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}
