import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Home from '@/pages/User/Home'
import { ProtectedRoute } from "./ProtectedRoute";
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LayoutForUser from '@/layout/User';
import Course from '@/pages/User/Course';
import { CourseDetail } from '@/pages/User/CourseDetail';
import { LessonDetail } from '@/features/Lesson/LessonDetail';
import { Enroll } from '@/pages/User/Enroll';
import { Setting } from '@/pages/User/Setting';
import { EditAcc } from '@/features/Setting/EditAcc';
import { ChangePassword } from '@/features/Setting/ChangePassword';
import { Invoice } from '@/features/Setting/Invoice';

const route = createBrowserRouter([
  {
    path: '/',
    element: < Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <LayoutForUser />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "course",
        element: <Course />
      },
      {
        path: "course-detail/:id",
        element: <CourseDetail />
      },
      {
        path: "lesson-detail/:courseId/:episodeId",
        element: <LessonDetail />
      },
      {
        path: "enroll/:id",
        element: <Enroll />
      },
      {
        path: "setting",
        element: <Setting />,
        children: [
          {
            index: true,
            element: <EditAcc />
          },
          {
            path: "edit-account",
            element: <EditAcc />
          },
          {
            path: "change-password",
            element: <ChangePassword />
          },
          {
            path: "invoice",
            element: <Invoice />
          }
        ]
      }

    ],
  },
])

export default route