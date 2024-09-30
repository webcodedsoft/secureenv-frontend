import clsx from 'clsx'
import React from 'react'

import Spacer from '../Spacer'
import { Icon, Icons } from 'components/Icon'

type VariantTypes = 'primary' | 'secondary' | 'outline' | 'transparent'
type SizeTypes = 'sm' | 'md' | 'lg' | 'custom'

export interface ButtonProps {
  variant: VariantTypes
  size?: SizeTypes
  label?: string
  onClick?: (arg: any) => void
  type?: 'button' | 'submit'
  icon?: React.ReactNode
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  capitalized?: boolean
  className?: any
  iconPosition?: 'left' | 'right'
  iconLabelSpacing?: number
}

const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  onClick = () => { },
  type = 'button',
  icon,
  loading = false,
  disabled = false,
  capitalized,
  className,
  size, // If we have size, we should not have variant as it overrides the width of what is set on additional className
  iconPosition = 'left',
  iconLabelSpacing = 16,
  loadingText,
}) => {

  return (
    <button
      className={clsx({
        'flex items-center justify-center cursor-pointer hover:bg-[#264653] hover:opacity-80 tracking-wide': true,
        // 'h-[40px]': !size || ['lg', 'md'].includes(size),
        'px-4 py-[5px] text-sm': size === 'sm',
        'md:px-5 md:py-2 md:text-base px-4 py-[5px] text-sm': size === 'md',
        'md:px-8 md:py-2.5 md:text-lg px-4 py-[5px] text-sm': size === 'lg',
        'bg-[#264653] text-[#fff] box-content': variant === 'primary',
        'text-[#7F8B94] border border-solid border-[#7F8B94]': variant === 'secondary',
        'border border-[#264653]': variant === 'outline',
        'hover:bg-[#264653] hover:opacity-80 hover:text-white': variant === 'primary' && !disabled,
        'opacity-50 hover:none cursor-not-allowed': disabled,
        'bg-transparent outline-none border-none': variant === 'transparent',
        capitalize: capitalized,
        [className]: className,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {loading && <Icon name={Icons.ActivityIndicator} />}
      {icon && iconPosition === 'left' && !loading && (
        <>
          {icon}
          <Spacer width={iconLabelSpacing} />
        </>
      )}
      {!loading ? label : !loadingText ? 'Loading...' : `${loadingText}...`}
      {icon && iconPosition === 'right' && !loading && (
        <>
          <Spacer width={iconLabelSpacing} />
          {icon}
        </>
      )}
    </button>
  )
}

export default Button
