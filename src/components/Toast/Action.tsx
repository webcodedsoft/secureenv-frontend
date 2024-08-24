import { FC } from 'react'

import Button from '../Forms/Button'
import { Icon, Icons } from '../Icon'
import { fillColor, ToastState } from './interface'
import { ToastIcon } from './ToastIcon'

interface IAlertProps {
  type: ToastState
  message: string
  closeToast?: () => void
  header: string
  handleConfirm: () => void
  beforeClose?: () => void
}

export const Action: FC<IAlertProps> = ({ closeToast, type, message, header, handleConfirm, beforeClose }) => {
  const close = () => {
    handleConfirm()
    closeToast!()
  }

  const cancel = () => {
    if (beforeClose) beforeClose()
    closeToast!()
  }

  return (
    <div className="flex items-start ">
      <div>
        <ToastIcon type={type} />
      </div>
      <div className="ml-3 mr-auto">
        <p className="mb-2 font-normal text-primary-800">{header}</p>
        <p className="mb-4 text-xs text-primary-800">{message}</p>
        <div className="flex">
          <Button variant="outline" size="sm" className="w-fit rounded" onClick={close} label="Confirm"></Button>
          <Button variant="outline" size="sm" className="w-fit rounded" onClick={cancel} label="Cancel"></Button>
        </div>
      </div>
      <button onClick={cancel} type="button">
        <Icon name={Icons.Cancel} fill={fillColor[type]} height={20} width={20} />
      </button>
    </div>
  )
}

Action.defaultProps = {
  closeToast: () => {},
  beforeClose: () => {},
}
