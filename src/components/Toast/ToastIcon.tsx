import { Icon, Icons } from '../Icon'
import { ToastState } from './interface'

interface IToastIconProps {
  type: ToastState
}

export const ToastIcon = ({ type }: IToastIconProps) => {
  if (type === 'error') {
    return <Icon name={Icons.Error} height={25} width={25} />
  }
  if (type === 'warning') {
    return <Icon name={Icons.Warning} fill="#EE9C2F" height={25} width={25} />
  }
  if (type === 'success') {
    return <Icon name={Icons.Success} height={25} width={25} />
  }
  if (type === 'info') {
    return <Icon name={Icons.Info} fill="#008FB2" height={25} width={25} />
  }
  return <div />
}
