import { createBrowserRouter } from 'react-router';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { NoteEditor } from './components/NoteEditor';
import { EmptyState } from './components/EmptyState';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <EmptyState />,
      },
      {
        path: 'note/:noteId',
        element: <NoteEditor />,
      },
    ],
  },
]);
