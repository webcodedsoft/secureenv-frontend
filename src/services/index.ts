import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import AuthService from './authentication'

export const baseService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
  timeout: 40000,

})

baseService.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    request.headers['Usage'] = "API";
    return request;
  },
  (error) => error
);

export const services = {
  authService: new AuthService(baseService),
}
