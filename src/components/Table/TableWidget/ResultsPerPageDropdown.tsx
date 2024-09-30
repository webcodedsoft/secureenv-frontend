import clsx from 'clsx'
import useOnClickOutside from 'common/hooks/useOnClickOutside'
import { Icon, Icons } from 'components/Icon'
import { useRef, useState } from 'react'

type OptionType = {
  label: number
  value: number
}

const DROPDOWN_OPTIONS = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 50,
    value: 50,
  },
]

interface IProps {
  selectedOption: OptionType
  setSelectedOption: (option: OptionType) => void
}

const ResultsPerPageDropdown: React.FC<IProps> = ({ selectedOption, setSelectedOption }) => {
  const rootRef = useRef<HTMLInputElement>(null)
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)

  const closeDropdown = () => {
    setIsOptionsVisible(false)
  }

  const toggleDropdownVisibility = () => {
    setIsOptionsVisible((vis) => !vis)
  }

  useOnClickOutside(rootRef, closeDropdown)

  return (
    <div className="relative z-50 w-full" ref={rootRef}>
      <button
        type="button"
        className="flex h-8 w-16 cursor-pointer items-center justify-between rounded border border-solid border-[#D1D2D4] p-[5.5px] text-center"
        onClick={() => {
          toggleDropdownVisibility()
        }}
      >
        <p
          className={clsx({
            'text-xs text-center ml-5': true,
            'text-[#B2B2B2]': !selectedOption,
            'text-[#434343]': selectedOption,
          })}
        >
          {selectedOption.label}
        </p>
        {/* <Icon name={Icons.ArrowDown} width={10} height={10} /> */}
      </button>
      {isOptionsVisible && (
        <div className="absolute top-4 w-[111px] overflow-y-auto shadow-lg">
          <ul className="w-full dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg bg-neutral-bg pt-1">
            {DROPDOWN_OPTIONS.map((option) => (
              <li
                className={clsx({
                  'w-full cursor-pointer': true,
                  'border-r-primary-800 border-r-[2px] border-r-solid': option.label === selectedOption.label,
                })}
                key={option.label}
              >
                <button
                  type="button"
                  className={clsx({
                    'flex justify-start items-center w-full pl-4 font-medium text-xs cursor-pointer h-8': true,
                    'text-primary-800': selectedOption.label === option.label,
                    'text-gray-1100 dark:text-gray-dark-1100': selectedOption.label !== option.label,
                  })}
                  onClick={() => {
                    setSelectedOption(option)
                    closeDropdown()
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ResultsPerPageDropdown
