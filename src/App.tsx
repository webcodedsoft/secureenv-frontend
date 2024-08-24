import { Suspense } from 'react'
import { Flip, ToastContainer } from 'react-toastify'

import Routes from './router'

import { IToastType } from './components/Toast'
import AxiosInterceptor from './services/interceptors/axios.interceptor'

interface IContextClass extends IToastType {
  [key: string]: string
}
const contextClass: IContextClass = {
  success: 'bg-success-100 border-success-500',
  error: 'bg-error-100 border-error-400',
  info: 'bg-info-100 border-info-500',
  warning: 'bg-warning-200 border-warning-500',
}

const isWindowsOs = () => {
  let OSName = 'Unknown OS'
  if (window.navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows'
  return OSName === 'Windows'
}

if (isWindowsOs()) {
  import('./styles/scrollbars.css').then(() => { })
}

function App() {
  return (
    <Suspense>
      <AxiosInterceptor>
        <Routes />
      </AxiosInterceptor>
      <ToastContainer
        position="bottom-center"
        transition={Flip}
        icon={false}
        closeButton={false}
        toastClassName={({ type }: any) => `${contextClass[type || 'default']} shadow-lg border rounded-lg`}
        hideProgressBar
      />
    </Suspense>
  )
}
export default App
