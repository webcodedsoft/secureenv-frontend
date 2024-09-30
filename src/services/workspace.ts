import { AxiosError, AxiosInstance } from 'axios';
import { errorHandler } from 'utils';
import { WorkspaceDtoPayload } from './dtos/workspace.dto';

class WorkspaceService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  createWorkspace = async (
    payload: WorkspaceDtoPayload
  ) => {
    try {
      const response = await this.baseService.post('/workspace/create', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  updateWorkspace = async (
    payload: WorkspaceDtoPayload
  ) => {
    try {
      const response = await this.baseService.put('/workspace/update', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  deleteWorkspace = async (
  ) => {
    try {
      const response = await this.baseService.delete('/workspace/delete')
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

}
export default WorkspaceService

