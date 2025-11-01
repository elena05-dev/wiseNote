'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotesClient } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';
import css from './NotesPage.module.css';
import FloatingTagsMenu from '@/components/TagsMenu/FloatingTagsMenu';

import type {
  FetchNotesResponse,
  NoteTag,
  FetchNotesParams,
} from '@/types/note';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  initialTag: NoteTag;
}

export default function NotesClient({
  initialData,
  initialTag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [tag, setTag] = useState<NoteTag>(initialTag);

  useEffect(() => {
    setTag(initialTag);
    setPage(1);
  }, [initialTag]);

  const queryParams: FetchNotesParams = {
    page,
    search: debouncedSearch,
    tag,
  };

  const { data, isLoading, isFetching, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => getNotesClient(queryParams),
    initialData,
    refetchOnMount: true,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.pageHeader}>
          <h1>{tag ? ` ${tag}` : 'All Notes'}</h1>
        </div>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.floatingBtn}>
          +
        </Link>
      </header>
      <FloatingTagsMenu />
      <Link href="/notes/action/create" className={css.floatingBtn}>
        +
      </Link>
      {error && (
        <div className={css.error}>
          Error:{' '}
          {error instanceof Error ? error.message : 'Something went wrong'}
        </div>
      )}
      {isLoading || isFetching ? (
        <div className={css.loader}></div>
      ) : data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <div className={css.noNotes}>No notes found</div>
      )}
      {data?.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          onPageChange={handlePageChange}
          currentPage={page - 1}
        />
      )}
    </div>
  );
}
