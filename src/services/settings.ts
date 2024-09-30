import { AxiosError, AxiosInstance } from 'axios';
import { errorHandler } from 'utils';
import { ChangeDecryptionPasswordDto, DecryptionPasswordDto } from './dtos/setting.dto';

class SettingsService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  createDecryptionPassword = async (decryptionPasswordDto: DecryptionPasswordDto) => {
    try {
      const response = await this.baseService.post('/settings/create-decryption-password', decryptionPasswordDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  changeDecryptionPassword = async (changeDecryptionPasswordDto: ChangeDecryptionPasswordDto) => {
    try {
      const response = await this.baseService.put('/settings/change-decryption-password', changeDecryptionPasswordDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  validateDecryptionPassword = async (decryptionPasswordDto: DecryptionPasswordDto) => {
    try {
      const response = await this.baseService.post('/settings/validate-decryption-password', decryptionPasswordDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

}
export default SettingsService
