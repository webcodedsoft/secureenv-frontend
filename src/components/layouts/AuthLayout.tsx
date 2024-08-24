import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className="w-screen relative overflow-x-hidden min-h-screen bg-gray-100 scrollbar-hide authentication-sign-in-page dark:bg-[#000]">
      <div
        className="wrapper mx-auto text-gray-900 font-normal grid scrollbar-hide grid-cols-[257px,1fr] grid-rows-[auto,1fr]"
        id="layout"
      >
        <header className="flex items-center justify-between flex-wrap bg-neutral-bg p-5 gap-5 md:py-6 md:pl-[25px] md:pr-[38px] lg:flex-nowrap dark:bg-dark-neutral-bg lg:gap-0">
          <a className="hidden logo" href="index.html">
            <img
              className="md:mr-[100px] lg:mr-[133px]"
              src="assets/images/icons/icon-logo.svg"
              alt="Frox logo"
            />
          </a>
        </header>

        <section className="overflow-x-scroll scrollbar-hide flex flex-col justify-between pt-[42px] px-[23px] pb-[28px]">
          <Outlet />

          {/* <footer className="mt-[37px]">
            <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-[25px]" />
            <div className="flex items-center justify-between text-desc text-gray-400 flex-wrap gap-5 dark:text-gray-dark-400">
              <div className="flex items-center gap-2 flex-wrap">
                <p> <span>© 2022 -</span><span className="text-color-brands">&nbsp;Frox</span><span>&nbsp;Dashboard</span></p>
                <div className="bg-color-brands rounded-full hidden w-[2px] h-[2px] md:block" />
                <p> <span>Made by</span><a className="text-color-brands" href="https://alithemes.com" target="_blank">&nbsp;AliThemes</a></p>
              </div>
              <div className="flex items-center gap-[15px]"><a className="transition-colors duration-300 hover:text-color-brands" href="#">About</a><a className="transition-colors duration-300 hover:text-color-brands" href="#">Careers</a><a className="transition-colors duration-300 hover:text-color-brands" href="#">Policy</a><a className="transition-colors duration-300 hover:text-color-brands" href="#">Contact</a></div>
            </div>
          </footer> */}
        </section>
      </div>
    </main>
  )
}
