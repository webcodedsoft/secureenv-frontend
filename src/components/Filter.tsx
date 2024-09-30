import { Icon, Icons } from './Icon'

interface IDropdownOption {
  label: string
  value: string
}

type Props = {
  label: string
  options: IDropdownOption[]
  onSelect: (val: string) => void
  className?: any
}

export default function Filter({ label, options, onSelect }: Props) {
  return (
    <div className="dropdown dropdown-end">
      <label
        className="cursor-pointer dropdown-label flex items-center justify-between"
        tabIndex={0}
      >
        <div className="flex items-center p-4 bg-neutral-bg border border-neutral rounded-lg w-24 dark:bg-dark-neutral-bg dark:border-dark-neutral-border gap-[5px]">
          <Icon name={Icons.Filter} />
          <p className="text-sm leading-4 text-gray-500 dark:text-gray-dark-500">
            {label}
          </p>
        </div>
      </label>
      <ul className="dropdown-content" tabIndex={0}>
        <div className="relative menu rounded-box dropdown-shadow w-36 bg-neutral-bg pt-4 pb-2 px-4 border border-neutral-border dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
          <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-4 top-2 border-b-transparent right-5" />
          {options.map((option) => (
            <li className="text-normal mb-2 cursor-pointer" key={option.value} onClick={() => onSelect(option.value)}>
              <div className="flex items-center bg-transparent p-0">
                <span className="text-gray-500 text-xs leading-4 hover:text-gray-700">
                  {option.label}
                </span>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}
