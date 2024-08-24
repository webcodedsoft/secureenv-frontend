export type ToastState = 'info' | 'success' | 'warning' | 'error'

export interface IToastType {
  info: string
  success: string
  warning: string
  error: string
}

export const fillColor: IToastType = {
  warning: '#EE9C2F',
  info: '#008FB2',
  error: '#FF3B3B',
  success: '#009969',
}

export const textColor: IToastType = {
  warning: 'text-yellow-800',
  info: 'text-blue-800',
  error: 'text-red-800',
  success: 'text-green-800',
}

export const bgColor: IToastType = {
  warning: 'bg-yellow-50',
  info: 'bg-blue-50',
  error: 'bg-red-50',
  success: 'bg-green-50',
}
