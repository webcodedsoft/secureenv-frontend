import { lazy } from 'react'
import Settings from './Settings'
import GettingStarted from '.'

const PortalLayout = lazy(() => import('../../components/layouts/PortalLayout'))
const Project = lazy(() => import('./Project'))
const AddProject = lazy(() => import('./Project/AddProject'))
const ProjectDetails = lazy(() => import('./Project/Details/ProjectDetails'))
const ManageTeam = lazy(() => import('./Teams/index'))
const TeamDetails = lazy(() => import('./Teams/TeamDetails'))

const portalRoutes = [
  {
    path: 'organization/:orgId',
    element: <PortalLayout />,
    children: [
      { path: 'get-started', element: <GettingStarted /> },
      {
        path: '',
        children: [
          {
            path: '',
            element: <Project />,
          },
          {
            path: 'add-project',
            element: <AddProject />,
          },
          {
            path: 'project/:projectName/:projectId',
            element: <ProjectDetails />,
          },
        ]
      },
      {
        path: 'teams',
        children: [
          {
            path: '',
            element: <ManageTeam />
          },
          {
            path: 'details/:teamId',
            element: <TeamDetails />
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            element: <Settings />
          },
        ]
      },

    ],
  },
]

export default portalRoutes
