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
import TestResults from './components/TestResults';

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
  ,{
    path: "/teacher/test/:testId",
    element: <TestResults />,
    loader: async({request, params }) => {
      return fetch(`/test/${params.testId}`,
        { signal: request.signal }
      )
    }
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
