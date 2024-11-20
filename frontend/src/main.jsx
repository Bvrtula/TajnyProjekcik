import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from './pages/Test';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Teacher from './pages/Teacher.jsx';
import { Toaster } from "@/components/ui/toaster"
import { Student } from './pages/Student';
import TestResults from './components/TestResults';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoutes';
import AnswerTabs from './components/answers/AnswersTabs';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },{
    path: "/register",
    element: <Register />
  },{
    path: "/login",
    element: <Login />
  },{
    path: "/teacher",
    element: (
      <ProtectedRoute element={<Teacher />} requiredRole="teacher" />
    ),
  },{
    path: "/student",
    element: (
      <ProtectedRoute element={<Student />} requiredRole="student" />
    ),
  },{
    path: "/student/test",
    element: (
      <ProtectedRoute element={<Test />} requiredRole="student" />
    ),
  },{
    path: "/teacher/test/:testId",
    element: (
      <ProtectedRoute element={<TestResults />} requiredRole="teacher" />
    ),
    loader: async({ request, params }) => {
      return fetch(`/test/${params.testId}`, { signal: request.signal });
    }
  },
  
  
  {
    path: `/teacher/test/answertabs/:userid`,
    element: (
      <ProtectedRoute element={<AnswerTabs />} requiredRole="teacher" />
    )
  },
  
  
  {
    path: "/student/test/:testId",
    element: (
      <ProtectedRoute element={<Test />} requiredRole="student" />
    ),
    loader: async({ request, params }) => {
      return fetch(`/test/${params.testId}`, { signal: request.signal });
    }
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <div>
    <AuthProvider >
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
    </div>
  </StrictMode>,
)
