// src/app/providers/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/ui/HomePage";
import { FavoritePage } from "../../pages/home/ui/FavoritePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/favorites",
    element: <FavoritePage />,
  },
]);
