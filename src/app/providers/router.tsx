// src/app/providers/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../../pages/home/ui/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);