import Logo from '../../assets/icons/icon-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AvatarInitial from 'components/Avatar/Initial'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'
import { Icon, Icons } from 'components/Icon'
import { logout } from 'thunks/account-thunk'

export default function TopBar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(selectAccountDetails)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <header className="md:flexs flex-wrap items-center justify-between gap-5 bg-neutral-bg p-5 shadow-md md:py-2 md:pl-[25px] md:pr-[38px] lg:flex-nowrap lg:gap-0 dark:bg-dark-neutral-bg">
      <Link className="logo hidden" to="">
        <img
          className="md:mr-[100px] lg:mr-[133px]"
          src={Logo}
          alt="Frox logo"
        />
      </Link>
      <div className="user-noti order-2 flex items-center justify-end gap-[30px] lg:order-3 lg:mr-0 xl:gap-[48px]">
        <div className="dropdown dropdown-end">
          <label className="dropdown-label cursor-pointer" tabIndex={0}>
            <AvatarInitial name={user.name} avatarColor={user.avatarColor} />
          </label>
          <ul className="dropdown-content" tabIndex={0}>
            <div className="menu rounded-box dropdown-shadow relative mt-6 min-w-[237px] bg-neutral-bg p-6 pb-3 md:mt-10 dark:border-dark-neutral-border dark:bg-dark-neutral-bg dark:text-gray-dark-500">
              <div className="absolute right-4 top-2 w-4 border-x-8 border-b-8 border-t-0 border-solid border-x-transparent border-b-neutral-bg dark:border-b-dark-neutral-bg" />

              <li className="group rounded-lg p-4 pl-5 text-gray-500 hover:bg-gray-100 hover:text-gray-1100 dark:text-gray-dark-500 dark:hover:bg-gray-dark-100 dark:hover:text-gray-dark-1100">
                <NavLink
                  className="flex items-center gap-2 bg-transparent p-0"
                  to={`/workspace/${user.workspace.workspaceId}/project`}
                >
                  <i className="mr-2 grid size-4 place-items-center">
                    <Icon name={Icons.Project} />
                  </i>
                  <span>Projects</span>
                </NavLink>
              </li>
              <li className="group rounded-lg p-4 pl-5 text-gray-500 hover:bg-gray-100 hover:text-gray-1100 dark:text-gray-dark-500 dark:hover:bg-gray-dark-100 dark:hover:text-gray-dark-1100">
                <NavLink
                  className="flex items-center gap-2 bg-transparent p-0"
                  to={`/workspace/${user.workspace.workspaceId}/settings`}
                >
                  {' '}
                  <i className="mr-2 grid size-4 place-items-center">
                    <Icon name={Icons.Settings} />
                  </i>
                  <span>Settings</span>
                </NavLink>
              </li>
              <div className="my-2 h-px w-full bg-neutral dark:bg-dark-neutral-border" />
              <li className="group rounded-lg p-4 pl-5 text-gray-500 hover:bg-gray-100 hover:text-gray-1100 dark:text-gray-dark-500 dark:hover:bg-gray-dark-100 dark:hover:text-gray-dark-1100">
                <button
                  className="flex items-center gap-2 bg-transparent p-0"
                  type="button"
                  onClick={handleLogout}
                >
                  <i className="grid size-4 place-items-center">
                    <Icon name={Icons.Logout} />
                  </i>
                  <span>Log out</span>
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </header>
  )
}
