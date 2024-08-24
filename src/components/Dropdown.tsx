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
}

export default function Dropdown({ options, className, modalPosition }: Props) {
  return (
    <div className="dropdown dropdown-end ml-auto translate-x-4 z-10">
      <label
        className="cursor-pointer dropdown-label flex items-center justify-between py-2 px-4"
        tabIndex={0}
      >
        <img className={clsx({
          "cursor-pointer": true,
          [className]: className
        })} src={Toggle} alt="toggle icon" />
      </label>
      <ul className={`dropdown-content ${modalPosition}`} tabIndex={0}>
        <div className="relative menu rounded-box dropdown-shadow min-w-[126px] bg-neutral-bg mt-[10px] pt-[14px] pb-[7px] px-4 border border-neutral-border  dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg rounded-lg">
          <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-transparent right-[18px]" />
          {options.map((option) => (
            <div key={option.label}>
              {!option.isDlete ? (
                <li className="text-normal mb-[7px]">
                  <div
                    role="button"
                    tabIndex={-1}
                    className="flex items-center bg-transparent p-0 gap-[7px]"
                    onKeyDown={option.onClick}
                    onClick={option.onClick}
                  >
                    <span className="text-gray-500 text-[11px] leading-4 hover:text-gray-700">
                      {option.label}
                    </span>
                  </div>
                </li>
              ) : (
                <>
                  <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border" />
                  <li className="text-normal mb-[7px]">
                    <div
                      role="button"
                      tabIndex={-1}
                      className="flex items-center bg-transparent p-0 gap-[7px]"
                      onKeyDown={option.onClick}
                      onClick={option.onClick}
                    >
                      <span className="text-red text-[11px] leading-4">
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
