import { AxiosError, AxiosInstance } from 'axios'
import { errorHandler } from 'utils'
import { WorkspaceDtoPayload } from './dtos/workspace.dto'
import {
  AuditType,
  CreateEnvDto,
  CreateNoteDto,
  DecryptionPasswordDto,
  EditEnvDto,
  EnvironmentDto,
  NoteType,
  SaveEnvDto
} from './dtos/environment.dto'
import { ApiPaginationOptions } from 'types/general.type'

class EnvironmentService {
  private baseService: AxiosInstance

  // eslint-disable-next-line prettier/prettier
  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  getEnvironment = async (projectId: number, environmentId: number) => {
    try {
      const response = await this.baseService.get(
        `/environment/${projectId}/${environmentId}`
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  async toggleEnvironmentLock(
    projectId: number,
    environmentId: number,
    isEnvLocked: boolean
  ) {
    try {
      const response = await this.baseService.patch(
        `/environment/${projectId}/${environmentId}/${isEnvLocked}`
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  updateEnvironment = async (payload: WorkspaceDtoPayload) => {
    try {
      const response = await this.baseService.put('/workspace/update', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  async saveEnv(saveEnvDto: SaveEnvDto) {
    try {
      const response = await this.baseService.put(
        `/environment/save-env`,
        saveEnvDto
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  validateDecryptionPassword = async (
    decryptionPasswordDto: DecryptionPasswordDto
  ): Promise<EnvironmentDto> => {
    try {
      const response = await this.baseService.post(
        '/environment/validate-decryption-password',
        decryptionPasswordDto
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  createNote = async (createNoteDto: CreateNoteDto): Promise<any> => {
    try {
      const response = await this.baseService.post(
        '/environment/create-note',
        createNoteDto
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  getNotes = async (
    whereOptions: Record<string, any>,
    paginationOptions: ApiPaginationOptions
  ): Promise<NoteType> => {
    try {
      const response = await this.baseService.get(
        '/environment/get/env/notes',
        {
          params: {
            whereOptions,
            paginationOptions
          }
        }
      )
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  uploadEnvFile = async (
    file: File,
    projectId: number,
    environmentId: number,
    additionalData: any
  ) => {
    try {
      // Create FormData object to hold the file and other data
      const formData = new FormData()
      formData.append('file', file) // 'file' must match the field in your controller
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key])
      })

      const response = await this.baseService.post(
        `/upload-env-file?projectId=${projectId}&environmentId=${environmentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  getProjectEnvs = async (projectId: number): Promise<EnvironmentDto[]> => {
    try {
      const response = await this.baseService.get(
        `/environment/project/env-by-id/${projectId}`
      )
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  createEnv = async (payload: CreateEnvDto) => {
    try {
      const response = await this.baseService.post(
        '/environment/create-env-from-existing-env',
        payload
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  editEnvironment = async (payload: EditEnvDto) => {
    try {
      const response = await this.baseService.patch(
        '/environment/edit-environment',
        payload
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  deleteEnvironment = async (projectId: number, environmentId: number) => {
    try {
      const response = await this.baseService.delete(
        `/environment/delete-environment/${projectId}/${environmentId}`
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  lockEnvironment = async (projectId: number, environmentId: number) => {
    try {
      const response = await this.baseService.delete(
        `/environment/lock-environment/${projectId}/${environmentId}`
      )
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  getEnvAuditLogs = async (
    whereOptions: Record<string, any>,
    paginationOptions: ApiPaginationOptions
  ): Promise<AuditType> => {
    try {
      const response = await this.baseService.get(
        '/environment/get/env/audit-logs',
        {
          params: {
            whereOptions,
            paginationOptions
          }
        }
      )
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }
}
export default EnvironmentService
