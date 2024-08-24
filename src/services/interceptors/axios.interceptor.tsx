import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


import { baseService } from '..'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'thunks/account-thunk'

// Responsible for logging the user out if token expires
const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const responseInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errorInterceptor = (error: AxiosError) => {
      if (error?.response?.status === 401) {
        dispatch(logout())
        navigate('/')
      }
      return Promise.reject(error)
    }

    const interceptor = baseService.interceptors.response.use(responseInterceptor, errorInterceptor)

    return () => {
      baseService.interceptors.response.eject(interceptor)
    }
  }, [dispatch, location.pathname, navigate])

  return <>{children}</>
}

export default AxiosInterceptor
