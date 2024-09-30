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
  handleMerge: () => void
  handleReplace: () => void
  beforeClose?: () => void
}

export const Action: FC<IAlertProps> = ({ closeToast, type, message, header, handleReplace, beforeClose, handleMerge }) => {

  const merge = () => {
    handleMerge()
    closeToast!()
  }
  const replace = () => {
    handleReplace()
    closeToast!()
  }

  const cancel = () => {
    if (beforeClose) beforeClose()
    closeToast!()
  }

  return (
    <div className='dark:bg-color-brands bg-color-brands rounded-md'>
      <div className="flex items-start p-5">
        <div>
          <ToastIcon type={type} />
        </div>
        <div className="ml-3 mr-auto">
          <p className="mb-2 font-normal text-base">{header}</p>
          <p className="mb-4 text-xs text-primary-800">{message}</p>
          <div className="flex gap-x-4">
            <Button variant="secondary" size="sm" className="w-fit rounded" onClick={merge} label="Merge"></Button>
            <Button variant="secondary" size="sm" className="w-fit rounded" onClick={replace} label="Replace"></Button>
            <Button variant="secondary" size="sm" className="w-fit rounded" onClick={cancel} label="Discard"></Button>
          </div>
        </div>
        <button onClick={cancel} type="button">
          <Icon name={Icons.Cancel} fill={fillColor[type]} height={20} width={20} />
        </button>
      </div>
    </div>
  )
}

Action.defaultProps = {
  closeToast: () => { },
  beforeClose: () => { },
}
