# WiseNote

WiseNote is a full-stack web application for creating, managing, and organizing personal notes.

The application provides authentication, note management, search, filtering by tags, pagination, and a user profile.

## Live Demo

https://wise-note-nu.vercel.app/

## Features

- User registration and login
- Protected routes
- Create, edit, view, and delete notes
- Search notes with debounced input
- Filter notes by tags
- Pagination
- User profile
- Responsive design
- Toast notifications
- Smooth UI animations

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Zustand
- Axios
- Framer Motion
- React Hot Toast
- React Paginate

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Cookie Parser
- CORS

### Deployment

- Vercel — frontend
- Render — backend
- MongoDB Atlas — database

## Project Structure

### Frontend

```text
wiseNote/
├── app/
│   ├── (private routes)/
│   │   ├── notes/
│   │   └── profile/
│   ├── (auth routes)/
│   ├── api/
│   └── layout.tsx
├── components/
├── lib/
│   ├── api/
│   └── stores/
├── types/
├── public/
└── package.json
```

wiseNote_backend/
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.js
└── package.json

## Getting Started

### Frontend

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Run the development server:

```bash
npm run dev
```

The application will be available at:

http://localhost:3000

### Backend

Install the dependencies:

```bash
npm install
```

Create a `.env` file with the required environment variables:

```env
PORT=4000
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_DB=
JWT_SECRET=
JWT_REFRESH_SECRET=
CORS_ORIGIN=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

## API

The backend provides REST API endpoints for authentication, users, and notes.

### Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login
- `POST /api/auth/logout` — logout
- `GET /api/auth/session` — check the current session
- `POST /api/auth/refresh` — refresh authentication tokens

### Notes

- `GET /api/notes` — get notes with search, filtering, and pagination
- `GET /api/notes/:noteId` — get a note by ID
- `POST /api/notes` — create a note
- `PATCH /api/notes/:noteId` — update a note
- `DELETE /api/notes/:noteId` — delete a note

### Users

- `GET /api/users/me` — get the current user

## Author

Elena

GitHub: https://github.com/elena05-dev
