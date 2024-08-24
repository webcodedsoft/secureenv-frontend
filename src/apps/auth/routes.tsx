import { lazy } from 'react'
import ForgotPassword from './ForgotPassword'
import Register from './Register'
import VerifySuccess from './VerifySuccess'
import ResetPassword from './ResetPassword'

const AuthLayout = lazy(() => import('../../components/layouts/AuthLayout'))
const Login = lazy(() => import('./Login'))

const authRoutes = [
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'sign-up',
        element: <Register />,
      },
      {
        path: 'welcome',
        element: <VerifySuccess />,
      },
    ],
  },
]

export default authRoutes
