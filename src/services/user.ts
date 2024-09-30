import { AxiosError, AxiosInstance } from 'axios';
import { ResetPasswordPayload, UpdateInformationDto } from './dtos/user.dto';
import { errorHandler } from 'utils';

class UserService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  updateAccountInformation = async (
    payload: UpdateInformationDto
  ) => {
    try {
      const response = await this.baseService.put('/user/update-profile', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  changePassword = async (payload: ResetPasswordPayload) => {
    try {
      const response = await this.baseService.put('/user/change-password', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  deleteAccount = async () => {
    try {
      const response = await this.baseService.delete('/user/delete-account')
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  fetchUserInformation = async () => {
    try {
      const response = await this.baseService.get('user/get-profile')
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

}
export default UserService
