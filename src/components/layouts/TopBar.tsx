import React from 'react'
import Logo from '../../assets/icons/icon-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import AvatarInitial from 'components/Avatar/Initial'
import { useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'
import { Icon, Icons } from 'components/Icon'

export default function TopBar() {

  const { user } = useAppSelector(selectAccountDetails);

  return (
    <header className="md:flexs shadow-md items-center justify-between flex-wrap bg-neutral-bg p-5 gap-5 md:py-6 md:pl-[25px] md:pr-[38px] lg:flex-nowrap dark:bg-dark-neutral-bg lg:gap-0">
      <Link className="hidden logo" to="">
        <img
          className="md:mr-[100px] lg:mr-[133px]"
          src={Logo}
          alt="Frox logo"
        />
      </Link>
      <div className="flex items-center justify-end order-2 user-noti gap-[30px] xl:gap-[48px] lg:order-3 lg:mr-0">
        <div className="dropdown dropdown-end">
          <label className="cursor-pointer dropdown-label" tabIndex={0}>
            <AvatarInitial name={user.name} avatarColor={user.avatarColor} />
          </label>
          <ul className="dropdown-content" tabIndex={0}>
            <div className="relative menu rounded-box dropdown-shadow p-6 pb-3 bg-neutral-bg mt-6 md:mt-10 min-w-[237px] dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
              <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-4 top-2 border-b-neutral-bg dark:border-b-dark-neutral-bg right-4" />

              <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-4 pl-5">
                <NavLink
                  className="flex items-center bg-transparent p-0 gap-2"
                  to={`/organization/${user.company.companyId}`}
                >
                  <i className="w-4 h-4 grid place-items-center mr-2">
                    <Icon name={Icons.Project} />
                  </i>
                  <span>Projects</span>
                </NavLink>
              </li>
              <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-4 pl-5">
                <NavLink
                  className="flex items-center bg-transparent p-0 gap-2"
                  to={`/organization/${user.company.companyId}/settings`}
                >
                  {' '}
                  <i className="w-4 h-4 grid place-items-center mr-2">
                    <Icon name={Icons.Settings} />
                  </i>
                  <span>Settings</span>
                </NavLink>
              </li>
              <div className="w-full bg-neutral h-[1px] my-2 dark:bg-dark-neutral-border" />
              <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-4 pl-5">
                <button
                  className="flex items-center bg-transparent p-0 gap-2"
                  type="button"
                >
                  <i className="w-4 h-4 grid place-items-center">
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
