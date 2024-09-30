import { lazy } from 'react'
import SignUpInvite from './SignUpInvite'

const AuthLayout = lazy(() => import('../../components/layouts/AuthLayout'))
const Login = lazy(() => import('./Login'))
const CreateWorkspace = lazy(() => import('./CreateWorkspace'))
const ResetPassword = lazy(() => import('./ResetPassword'))
const VerifySuccess = lazy(() => import('./VerifySuccess'))
const Register = lazy(() => import('./Register'))
const ForgotPassword = lazy(() => import('./ForgotPassword'))

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
        path: 'invite',
        element: <SignUpInvite />,
      },
      {
        path: 'welcome',
        element: <VerifySuccess />,
      },
      {
        path: 'workspace-setup',
        element: <CreateWorkspace />
      }
    ],
  },
]

export default authRoutes
