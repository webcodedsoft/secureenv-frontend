import React from 'react'
import Toggle from '../assets/icons/icon-toggle.svg'
import clsx from 'clsx'

interface IDropdownOption {
  label: string
  onClick: () => void
  isDlete?: boolean
}
type Props = {
  options: IDropdownOption[]
  className?: any
  modalPosition?: any
  title?: string
}

export default function Dropdown({
  options,
  className,
  modalPosition,
  title
}: Props) {
  return (
    <div className="dropdown dropdown-end z-10 ml-auto translate-x-4">
      <label
        className="dropdown-label flex cursor-pointer items-center justify-between px-4 py-2"
        tabIndex={0}
      >
        <img
          className={clsx({
            'cursor-pointer': true,
            [className]: className
          })}
          src={Toggle}
          alt="toggle icon"
        />
      </label>
      <ul className={`dropdown-content ${modalPosition}`} tabIndex={0}>
        <div className="menu rounded-box dropdown-shadow border-neutral-border relative mt-[10px] min-w-[126px] rounded-lg border bg-neutral-bg px-4 pb-[7px]  pt-[14px] dark:border-dark-neutral-border dark:bg-dark-neutral-bg dark:text-gray-dark-500">
          <div className="absolute right-[18px] top-[-7px] w-[14px] border-x-8 border-b-8 border-t-0 border-solid border-x-transparent border-b-transparent" />
          {title && (
            <li className="mb-[7px] pb-2 text-normal">
              <div className="flex items-center gap-[7px] border-b bg-transparent p-0">
                <span className="text-[11px] leading-4 text-gray-1100 dark:text-gray-dark-1100">
                  {title}
                </span>
              </div>
            </li>
          )}
          {options.map((option) => (
            <div key={option.label}>
              {!option.isDlete ? (
                <li className="mb-[7px] text-normal">
                  <div
                    role="button"
                    tabIndex={-1}
                    className="flex items-center gap-[7px] bg-transparent p-0"
                    onKeyDown={option.onClick}
                    onClick={option.onClick}
                  >
                    <span className="text-[11px] leading-4 text-gray-500 hover:text-gray-700">
                      {option.label}
                    </span>
                  </div>
                </li>
              ) : (
                <>
                  <div className="my-[7px] h-px w-full bg-neutral dark:bg-dark-neutral-border" />
                  <li className="mb-[7px] text-normal">
                    <div
                      role="button"
                      tabIndex={-1}
                      className="flex items-center gap-[7px] bg-transparent p-0"
                      onKeyDown={option.onClick}
                      onClick={option.onClick}
                    >
                      <span className="text-[11px] leading-4 text-red">
                        {option.label}
                      </span>
                    </div>
                  </li>
                </>
              )}
            </div>
          ))}
        </div>
      </ul>
    </div>
  )
}
