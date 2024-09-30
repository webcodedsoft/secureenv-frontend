import ArrowDownIcon from '../../assets/icons/icon-arrow-down.svg'
import ChatBubble from '../../assets/icons/icon-chat-bubble.svg'
import ChatBubbleDark from '../../assets/icons/icon-chat-bubble-dark.svg'
import HeroLayout from '../../assets/icons/hero-layouts.svg'
import Logo from '../../assets/icons/icon-logo.svg'
import Button from 'components/Forms/Button'
import { Link, useLocation } from 'react-router-dom'
import { portalNavs } from 'constants/nav'
import { determinePathName } from 'utils'
import { IUserNav } from 'types/INav.type'

export default function SideBar({ orgId, isCompany }: { orgId: string, isCompany: boolean }) {
  const { pathname } = useLocation()

  const determineMenu = (item: IUserNav) => {
    if (item.hasChild) {
      return (
        <>
          <input
            className="sr-only peer"
            type="checkbox"
            defaultValue={item.path}
            name="sidemenu"
            id={item.path}
          />
          <label
            className="flex items-center justify-between w-full cursor-pointer py-[17px] px-[21px] focus:outline-none peer-checked:border-transparent"
            htmlFor={item.path}
          >
            <div className="flex items-center gap-[10px]">
              <img
                src={item.icon}
                alt="side menu icon"
              />
              <span className="text-normal font-semibold text-gray-500 sidemenu-title dark:text-gray-dark-500">
                {item.name}
              </span>
            </div>
          </label>
          <img
            className="absolute right-2 transition-all duration-150 caret-icon pointer-events-none peer-checked:rotate-180 top-[22px]"
            src={ArrowDownIcon}
            alt="caret icon"
          />
          <div className="hidden peer-checked:block">
            <ul className="text-gray-300 child-menu z-10 pl-[53px]">
              {item.child?.map((ch) => (
                <li className="pb-2 transition-opacity duration-150 hover:opacity-75" key={ch.id}>
                  <Link className="text-normal" to={`/workspace/${orgId}${ch.path}`}>
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
        <div
          className="flex items-center justify-between w-full cursor-pointer py-[17px] px-[21px] focus:outline-none peer-checked:border-transparent"
        >
          <Link to={`/workspace/${orgId}${item.path}`} className="flex items-center gap-[10px]">
            <img
              src={item.icon}
              alt="side menu icon"
            />
            <span className="text-normal font-semibold text-gray-500 sidemenu-title dark:text-gray-dark-500">
              {item.name}
            </span>
          </Link>
        </div>
      )
    }
  }

  const predicate = (item: IUserNav) => {
    if (isCompany) {
      item.isGeneral = true;
    } else if (!item.isGeneral) {
      return false;
    }
    return true;
  };

  return (
    <aside className="bg-white hidden row-span-2 border-r border-neutral relative md:flex flex-col justify-between p-[25px] dark:bg-dark-neutral-bg dark:border-dark-neutral-border shadow-lg">
      <div>
        <Link className="mb-10" to="dashboard">
          <img
            className="logo-maximize"
            src={Logo}
            alt="Frox logo"
          />
        </Link>
        <div className="pt-[106px] lg:pt-[35px] pb-[18px]">
          {portalNavs.filter(predicate).map((item) => (
            <div key={item.id} className={`sidemenu-item rounded-xl relative
            ${determinePathName(pathname).includes(item.main) ? 'active' : ''}`}>
              {determineMenu(item)}
            </div>
          ))}

        </div>
      </div>
      <div className="rounded-xl pt-4 flex items-center gap-5 mt-5 sidebar-control pr-[1px] pb-[13px] pl-[1px] ">
        <div className="upgrade-card">
          <div className="w-full bg-neutral h-[1px] mb-[35px] dark:bg-dark-neutral-border" />
          <div className="rounded-xl bg-neutral py-5 w-fit flex flex-col gap-5 justify-between px-[31px] dark:bg-dark-neutral-border">
            <div className="relative mr-[18px]">
              <img
                className="ml-[6px] dark:hidden"
                src={ChatBubble}
                alt="chat bubble"
              />
              <img
                className="hidden ml-[6px] dark:block"
                src={ChatBubbleDark}
                alt="chat bubble"
              />
              <img
                className="w-full h-full object-cover"
                src={HeroLayout}
                alt="hero"
              />
            </div>
            <p className="text-desc text-center text-gray-1100 font-normal mx-auto max-w-[20ch] dark:text-gray-dark-1100">
              Unlock more information now by Upgrade to
              <span className="font-bold">&nbsp;PRO</span>
            </p>
            <div className='flex items-center justify-center'>
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
      </div>
    </aside>
  )
}
