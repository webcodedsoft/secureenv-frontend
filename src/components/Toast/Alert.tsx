import { FC } from 'react'

import { Icon, Icons } from '../Icon'
import { fillColor, ToastState } from './interface'
import { ToastIcon } from './ToastIcon'

interface IAlertProps {
  type: ToastState
  message: string
  closeToast?: () => void
}

export const Alert: FC<IAlertProps> = ({ closeToast, type, message }) => (
  <div className="dark:bg-transparents bg-color-brands rounded-md">
    <div className="flex items-center p-5">
      <div>
        <ToastIcon type={type} />
      </div>
      <p className="ml-4 mr-auto font-medium text-primary-900">{message}</p>
      <button onClick={closeToast} type="button" className="ml-4">
        <Icon name={Icons.Cancel} fill={fillColor[type]} height={16} width={16} />
      </button>
    </div>
  </div>
)

Alert.defaultProps = {
  closeToast: () => { },
}
