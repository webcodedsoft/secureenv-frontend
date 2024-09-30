import { AxiosError, AxiosInstance } from 'axios'


import { errorHandler } from 'utils'
import { LoginDto, PersonalInfoDto, ResetPasswordDto, SetupDto, ValidateEmailDto } from './dtos/auth.dto'

class AuthService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  login = async (loginDto: LoginDto) => {
    try {
      const response = await this.baseService.post('/authentication/sign-in', loginDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  logout = async () => {
    try {
      const response = await this.baseService.post('/authentication/logout')
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  checkIfEmailInUse = async (emailAddress: string) => {
    try {
      const response = await this.baseService.post('/authentication/email-exists', { emailAddress })
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  personalInfo = async (personalInfoDto: PersonalInfoDto) => {
    try {
      const response = await this.baseService.put('/authentication/personal-info', personalInfoDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  register = async (setupDto: SetupDto) => {
    try {
      const response = await this.baseService.post('/authentication/sign-up', setupDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  verifyUser = async (token: string, emailAddress: string) => {
    try {
      const response = await this.baseService.post('/authentication/activate-account', { token, emailAddress })
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  forgotPassword = async (validateEmailDto: ValidateEmailDto) => {
    try {
      const response = await this.baseService.post('/authentication/forgot-password', validateEmailDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  resetPassword = async (resetPasswordDto: ResetPasswordDto) => {
    try {
      const response = await this.baseService.post('/authentication/reset-password', resetPasswordDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }


  authenticate = async () => {
    const response = await this.baseService.get('/user/validate-auth')
    return response?.data
  }
}

export default AuthService
