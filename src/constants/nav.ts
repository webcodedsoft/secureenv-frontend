import { IUserNav } from 'types/INav.type'
import ProjectIcon from '../assets/icons/icon-project.svg'
import SettingIcon from '../assets/icons/icon-setting-2.svg'
import TeamsIcon from '../assets/icons/icon-crm.svg'
import MenuIcon from '../assets/icons/icon-menu.svg'

export const portalNavs: IUserNav[] = [
  // {
  //   id: 1,
  //   name: 'Getting Started',
  //   path: '/get-started',
  //   main: 'get-started',
  //   icon: MenuIcon,
  //   hasChild: false,
  // },
  {
    id: 2,
    name: 'Manage Project',
    path: '/project',
    main: 'project',
    icon: ProjectIcon,
    hasChild: true,
    child: [
      { id: 1, path: '/project', name: 'Dashboard' },
      { id: 2, path: '/add-project', name: 'Add Project' },
      // { id: 3, path: '/config', name: 'Manage Config' },
    ],
    isGeneral: true
  },
  {
    id: 3,
    name: 'Manage Team',
    path: '/teams',
    main: 'teams',
    icon: TeamsIcon,
    hasChild: false,
    isGeneral: false
  },
  {
    id: 4,
    name: 'Settings',
    path: '/settings',
    main: 'settings',
    icon: SettingIcon,
    hasChild: true,
    child: [
      { id: 5, path: '/settings', name: 'General Settings' },
      { id: 6, path: '/settings/workspace', name: 'Workspace Settings' },
      // { id: 7, path: '/white-list', name: 'White List IP' },
      // { id: 8, path: '/integration', name: 'Integration' },
      // { id: 9, path: '/billing', name: 'Billing' },
    ],
    isGeneral: true
  },
]
