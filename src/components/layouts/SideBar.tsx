import ArrowDownIcon from '../../assets/icons/icon-arrow-down.svg'
// import ChatBubble from '../../assets/icons/icon-chat-bubble.svg'
// import ChatBubbleDark from '../../assets/icons/icon-chat-bubble-dark.svg'
// import HeroLayout from '../../assets/icons/hero-layouts.svg'
import Logo from '../../assets/icons/icon-logo.svg'
// import Button from 'components/Forms/Button'
import { Link, useLocation } from 'react-router-dom'
import { portalNavs } from 'constants/nav'
import { determinePathName } from 'utils'
import { IUserNav } from 'types/INav.type'

export default function SideBar({
  orgId,
  isCompany
}: {
  orgId: string
  isCompany: boolean
}) {
  const { pathname } = useLocation()

  const determineMenu = (item: IUserNav) => {
    if (item.hasChild) {
      return (
        <>
          <input
            className="peer sr-only"
            type="checkbox"
            defaultValue={item.path}
            name="sidemenu"
            id={item.path}
          />
          <label
            className="flex w-full cursor-pointer items-center justify-between px-[21px] py-[17px] focus:outline-none peer-checked:border-transparent"
            htmlFor={item.path}
          >
            <div className="flex items-center gap-[10px]">
              <img src={item.icon} alt="side menu icon" />
              <span className="sidemenu-title text-normal font-semibold text-gray-500 dark:text-gray-dark-500">
                {item.name}
              </span>
            </div>
          </label>
          <img
            className="caret-icon pointer-events-none absolute right-2 top-[22px] transition-all duration-150 peer-checked:rotate-180"
            src={ArrowDownIcon}
            alt="caret icon"
          />
          <div className="hidden peer-checked:block">
            <ul className="child-menu z-10 pl-[53px] text-gray-300">
              {item.child?.map((ch) => (
                <li
                  className="pb-2 transition-opacity duration-150 hover:opacity-75"
                  key={ch.id}
                >
                  <Link
                    className="text-normal"
                    to={`/workspace/${orgId}${ch.path}`}
                  >
                    {ch.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    } else {
      return (
        <div className="flex w-full cursor-pointer items-center justify-between px-[21px] py-[17px] focus:outline-none peer-checked:border-transparent">
          <Link
            to={`/workspace/${orgId}${item.path}`}
            className="flex items-center gap-[10px]"
          >
            <img src={item.icon} alt="side menu icon" />
            <span className="sidemenu-title text-normal font-semibold text-gray-500 dark:text-gray-dark-500">
              {item.name}
            </span>
          </Link>
        </div>
      )
    }
  }

  const predicate = (item: IUserNav) => {
    if (isCompany) {
      item.isGeneral = true
    } else if (!item.isGeneral) {
      return false
    }
    return true
  }

  return (
    <aside className="relative row-span-2 hidden flex-col justify-between border-r border-neutral bg-white p-[25px] shadow-lg md:flex dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
      <div>
        <Link className="mb-10" to="dashboard">
          <img className="logo-maximize" src={Logo} alt="Frox logo" />
        </Link>
        <div className="pb-[18px] pt-[106px] lg:pt-[35px]">
          {portalNavs.filter(predicate).map((item) => (
            <div
              key={item.id}
              className={`sidemenu-item relative rounded-xl
            ${determinePathName(pathname).includes(item.main) ? 'active' : ''}`}
            >
              {determineMenu(item)}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="sidebar-control mt-5 flex items-center gap-5 rounded-xl px-px pb-[13px] pt-4 ">
        <div className="upgrade-card">
          <div className="mb-[35px] h-px w-full bg-neutral dark:bg-dark-neutral-border" />
          <div className="flex w-fit flex-col justify-between gap-5 rounded-xl bg-neutral px-[31px] py-5 dark:bg-dark-neutral-border">
            <div className="relative mr-[18px]">
              <img
                className="ml-[6px] dark:hidden"
                src={ChatBubble}
                alt="chat bubble"
              />
              <img
                className="ml-[6px] hidden dark:block"
                src={ChatBubbleDark}
                alt="chat bubble"
              />
              <img
                className="size-full object-cover"
                src={HeroLayout}
                alt="hero"
              />
            </div>
            <p className="mx-auto max-w-[20ch] text-center text-desc font-normal text-gray-1100 dark:text-gray-dark-1100">
              Unlock more information now by Upgrade to
              <span className="font-bold">&nbsp;PRO</span>
            </p>
            <div className="flex items-center justify-center">
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="mb-3 rounded-sm py-4 text-base text-white"
                label="Upgrade Now"
              ></Button>
            </div>
          </div>
        </div>
      </div> */}
    </aside>
  )
}
