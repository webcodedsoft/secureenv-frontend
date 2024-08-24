import { lazy } from 'react'

const PortalLayout = lazy(() => import('../../components/layouts/PortalLayout'))

const adminRoutes = [
  {
    path: '',
    element: <PortalLayout />,
    children: [
      {
        path: '',
        element: <div />,
      },
    ],
  },
]

export default adminRoutes
