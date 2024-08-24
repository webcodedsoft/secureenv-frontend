import adminRoutes from 'apps/admin/routes'
import authRoutes from 'apps/auth/routes'
import portalRoutes from 'apps/portal/routes'
import { useRoutes } from 'react-router-dom'

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: authRoutes,
    },
    {
      path: '',
      children: portalRoutes,
    },
    {
      path: 'admin',
      children: adminRoutes,
    },
  ])
}
