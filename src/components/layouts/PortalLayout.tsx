import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import { Outlet } from 'react-router-dom'

export default function PortalLayout() {
  const orgId = '14646744'
  return (
    <div
      className="wrapper mx-auto text-gray-900 font-normal md:grid scrollbar-hide grid-cols-[257px,1fr] grid-rows-[auto,1fr] h-screen"
    >
      <SideBar orgId={orgId} />
      <TopBar />
      <main className="overflow-x-scroll scrollbar-hide flex flex-col justify-between pt-[42px] px-[23px] pb-[28px] dark:bg-black md:w-full w-screen">
        <Outlet />
      </main>
    </div>
  )
}
