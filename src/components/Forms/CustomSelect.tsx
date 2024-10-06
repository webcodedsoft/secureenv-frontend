import clsx from 'clsx'
import React from 'react'
import Select from 'react-select'

import { Icon, Icons } from '../Icon'
import Spacer from '../Spacer'

interface IProps {
  options: { label: string; value: string | number }[] | undefined
  selectedOption: { label: string; value: string | number } | null
  inputValue?: any
  handleOptionChange: (
    option: {
      label: string
      value: string | number
    } | null
  ) => void
  onInputChange?: (value: any) => void
  label?: string
  isRequired?: boolean
  noOptionsMessage?: string
  placeholder?: string
  name?: string
  isSearchable?: boolean
  disabled?: boolean
  className?: string
  error?: string
  useDefaultDropdownIcon?: boolean
  bgColor?: string
  isLoading?: boolean
}

const CustomSelect: React.FC<IProps> = ({
  options = [],
  selectedOption,
  inputValue,
  handleOptionChange,
  onInputChange,
  label,
  isRequired,
  noOptionsMessage = 'No Options',
  placeholder = 'Select an option',
  name,
  isSearchable = false,
  disabled = false,
  className,
  error,
  isLoading = false
}) => {
  const controlStyles = {
    base: error
      ? `bg-red-50 border border-red text-red placeholder:text-red text-sm rounded-lg focus:ring-red focus:border-red ${className}`
      : `border dark:text-gray-dark-400 border-gray-400 bg-transparent hover:cursor-pointer dark:border-gray-800 ${className}`,
    focus: `border border-gray-100 rounded-lg dark:text-gray-500 dark:bg-dark-neutral-bg`,
    nonFocus: error
      ? 'border border-gray-100 rounded-lg hover:border-red dark:border-red'
      : 'border border-gray-100 rounded-lg hover:border-gray-400 dark:border-gray-800'
  }
  const placeholderStyles = error
    ? 'text-red'
    : 'text-gray-500 pl-1 py-0.5 z-50'
  const selectInputStyles = 'pl-1 py-0.5 z-50'
  const valueContainerStyles = 'p-1 gap-1 z-50 px-3'
  const singleValueStyles = 'leading-7 ml-1 z-50'
  const indicatorsContainerStyles = 'p-1 gap-1 z-50'
  const clearIndicatorStyles =
    'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800 z-50'
  const indicatorSeparatorStyles = 'bg-gray-300s z-50'
  const dropdownIndicatorStyles =
    'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black z-50'
  const menuStyles =
    'p-1 mt-2 border border-gray-200 bg-white dark:bg-dark-neutral-bg rounded-lg z-50 hover:text-gray-200 text-gray-500'
  const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm z-50'
  const optionStyles = {
    custom: 'hover:cursor-pointer px-3 py-2 rounded z-50',
    base: 'hover:cursor-pointer px-3 py-2 rounded z-50',
    focus:
      'bg-gray-700 active:bg-gray-200 px-3 py-2 z-50 dark:text-gray-dark-500',
    selected:
      "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500 dark:text-gray-dark-500 z-50"
  }
  const noOptionsMessageStyles =
    'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm z-50 '

  return (
    <div className="w-full">
      <span className="flex">
        <label className="mb-2 text-[12px] font-medium text-gray-1100 dark:text-gray-dark-1100">
          {label}
        </label>
        {isRequired && (
          <div className="mx-2 mb-2">
            <Spacer width={3} />
            <Icon name={Icons.Required} />
          </div>
        )}
      </span>
      <Select
        menuPortalTarget={document.body}
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none'
            }
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 })
        }}
        isDisabled={disabled}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) => {
            return clsx(
              isFocused ? optionStyles.focus : optionStyles.base,
              isSelected && optionStyles.selected
            )
          },
          noOptionsMessage: () => noOptionsMessageStyles
        }}
        classNamePrefix="custom_select"
        name={name}
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        inputValue={inputValue}
        onChange={(option) => {
          handleOptionChange(option)
        }}
        onInputChange={onInputChange}
        // onBlur={() => {
        //   handleOptionChange(selectedOption);
        // }}
        noOptionsMessage={() => noOptionsMessage}
        // components={!useDefaultDropdownIcon ? { DropdownIndicator } : {}}
        // components={{
        //   DropdownIndicator
        //   // MenuList: CustomSelectMenuListComponent
        // }}
        isSearchable={isSearchable}
        menuPlacement="auto"
        isLoading={isLoading}
      />
      {error && (
        <p className="mt-2 text-left text-xs text-red">{error.toString()}</p>
      )}
    </div>
  )
}

export default CustomSelect
