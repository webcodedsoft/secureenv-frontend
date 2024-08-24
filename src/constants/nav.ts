import { IUserNav } from 'types/INav.type'
import ProjectIcon from '../assets/icons/icon-project.svg'
import SettingIcon from '../assets/icons/icon-setting-2.svg'
import TeamsIcon from '../assets/icons/icon-crm.svg'
import MenuIcon from '../assets/icons/icon-menu.svg'

export const portalNavs: IUserNav[] = [
  // {
  //   name: 'Getting Started',
  //   path: '/get-started',
  //   main: 'get-started',
  //   icon: MenuIcon,
  //   hasChild: false,
  // },
  {
    name: 'Manage Project',
    path: '/project',
    main: 'project',
    icon: ProjectIcon,
    hasChild: true,
    child: [
      { path: '', name: 'Dashboard' },
      { path: '/add-project', name: 'Add Project' },
      // { path: '/config', name: 'Manage Config' },
    ]
  },
  {
    name: 'Manage Team',
    path: '/teams',
    main: 'teams',
    icon: TeamsIcon,
    hasChild: false,
  },
  {
    name: 'Settings',
    path: '/settings',
    main: 'settings',
    icon: SettingIcon,
    hasChild: false,
    child: [
      { path: '', name: 'General Settings' },
      { path: '/white-list', name: 'White List IP' },
      { path: '/integration', name: 'Integration' },
      { path: '/billing', name: 'Billing' },
    ]
  },
]
