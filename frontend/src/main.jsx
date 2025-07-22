// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // ✅ Correct
import { router } from "./router"; // from createBrowserRouter
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
