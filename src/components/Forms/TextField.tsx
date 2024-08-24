import clsx from 'clsx'
import React, { useState } from 'react'

import { Icon, Icons } from '../Icon'
import { Loader } from '../Loader'
import Spacer from '../Spacer'

interface TextFieldProps {
  type?: React.HTMLInputTypeAttribute | undefined
  onChange?: (e: React.ChangeEvent<any>) => void
  onBlur?: (e: React.FocusEvent<any, Element>) => void
  value: string | null
  label?: string
  placeholder: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  error?: string
  isRequired?: boolean
  rightIcon?: Icons
  leftIcon?: Icons
  className?: any
  isLoading?: boolean
  validateDate?: boolean
  maxDate?: string
  showPasswordToggler?: boolean
  hasStrengthIndicator?: boolean
  totalStrengthConditions?: number
  strengthConditionsFulfilled?: number
}

const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  onChange = () => { },
  onBlur = () => { },
  value,
  label,
  placeholder,
  size,
  name,
  disabled = false,
  error,
  isRequired,
  rightIcon,
  leftIcon,
  className,
  isLoading,
  validateDate = true,
  maxDate = '',
  showPasswordToggler,
  hasStrengthIndicator,
  totalStrengthConditions,
  strengthConditionsFulfilled,
}) => {
  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className="flex w-full flex-col">
      {label && (
        <div className="relative mb-2 flex items-center justify-between">
          <span className="flex items-center">
            <label className="text-left text-sm text-gray-1100 dark:text-gray-dark-1100" htmlFor={`grid-${name}`}>
              {label}
            </label>
            {showPasswordToggler && (
              <>
                <div
                  className="flex flex-col items-center justify-center"
                  role="button"
                  tabIndex={-1}
                  onKeyDown={() => setShowPassword((prevState) => !prevState)}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  <span className="text-[10px] font-bold text-[#DF4308]">{showPassword ? 'HIDE' : 'SHOW'}</span>
                  <div className="mt-px"></div>
                </div>
              </>
            )}
            {isRequired && (
              <div className="mx-2 mb-2">
                <Spacer width={3} />
                <Icon name={Icons.Required} />
              </div>
            )}
          </span>
        </div>
      )}
      <div>
        <div className="relative input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442]">
          {leftIcon && (
            <div className="absolute p-3 pt-2">
              <Icon width={20} height={20} name={leftIcon} /> <Spacer width={3} />
            </div>
          )}

          <input
            type={type}
            className={clsx({
              'input flex-1 bg-transparent text-gray-900 dark:text-gray-300 focus:outline-none block w-full rounded-lg dark:placeholder:text-gray-500': true,
              'border border-red text-red placeholder:text-red text-sm rounded-lg focus:ring-red-500 focus:border-red-500':
                error,
              'focus:border-[#264653] focus:ring-[#264653]': true,
              'p-6': size === 'xl',
              'px-3 py-2': size === 'lg',
              'p-2.5 text-sm': size === 'md',
              'p-2 text-xs': size === 'sm',
              'bg-[#F2F2F2]': disabled,
              'pl-8': leftIcon,
              [className]: className,
            })}
            placeholder={placeholder}
            value={value ?? ''}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={isRequired}
            autoComplete="false"
          />
          {isLoading && (
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader type="Wait" height={20} width={20} />
            </button>
          )}
          {rightIcon && <Icon width={20} height={20} name={rightIcon} />}
        </div>
        {error && <p className="mt-2 text-xs text-red text-left">{error.toString()}</p>}
      </div>
    </div>
  )
}

export default TextField
