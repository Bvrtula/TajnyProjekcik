import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Teacher from './pages/Teacher.jsx';
import { Toaster } from "@/components/ui/toaster"
import { Student } from './pages/Student';
import { ThemeProvider } from './components/theme-provider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },{
    path: "/register",
    element: <Register />
  },{
    path: "/login",
    element: <Login />
  },{
    path: "/teacher",
    element: <Teacher />
  },
  ,{
    path: "/student",
    element: <Student />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div>
    {/* <ThemeProvider> */}
    <RouterProvider router={router} />
    <Toaster />
    {/* </ThemeProvider> */}
    </div>
  </StrictMode>,
)
