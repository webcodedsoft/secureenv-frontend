import { lazy } from 'react'

const PortalLayout = lazy(() => import('../../components/layouts/PortalLayout'))
const Project = lazy(() => import('./Project'))
const AddProject = lazy(() => import('./Project/AddProject'))
const ProjectDetails = lazy(() => import('./Project/Details/ProjectDetails'))
const EnvEditor = lazy(() => import('./Project/Editor/EnvEditor'))
const ManageTeam = lazy(() => import('./Teams/index'))
const TeamDetails = lazy(() => import('./Teams/TeamDetails'))
const Settings = lazy(() => import('./Settings'))
const OrgSettings = lazy(() => import('./Settings/OrgSettings'))
const GettingStarted = lazy(() => import('.'))

const portalRoutes = [
  {
    path: 'workspace/:orgId',
    element: <PortalLayout />,
    children: [
      { path: 'get-started', element: <GettingStarted /> },
      {
        path: '',
        children: [
          {
            path: 'project',
            element: <Project />,
          },
          {
            path: 'add-project',
            element: <AddProject />,
          },
          {
            path: 'project/:projectSlug/:projectId',
            element: <ProjectDetails />,
          },
          {
            path: 'project/:projectSlug/:projectId/env-editor/:envId',
            element: <EnvEditor />,
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
          {
            path: 'workspace',
            element: <OrgSettings />
          },
        ]
      },

    ],
  },
]

export default portalRoutes
