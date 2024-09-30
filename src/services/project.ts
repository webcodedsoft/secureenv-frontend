import { AxiosError, AxiosInstance } from 'axios';
import { errorHandler } from 'utils';
import { Contributors, CreateProjectDto, ProjectDaum, ProjectDto, UpdateProjectDto } from './dtos/project.dto';
import { ApiPaginationOptions } from 'types/general.type';

class ProjectService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  createProject = async (
    payload: CreateProjectDto
  ) => {
    try {
      const response = await this.baseService.post('/project/create', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  getProjects = async (
    whereOptions: Record<string, any>,
    paginationOptions: ApiPaginationOptions,
  ): Promise<ProjectDto> => {
    try {
      const response = await this.baseService.get('/project/all', {
        params: {
          whereOptions,
          paginationOptions,
        },
      })
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  getProject = async (projectId: number, projectSlug: string): Promise<ProjectDaum> => {
    try {
      const response = await this.baseService.get(`/project/${projectId}/${projectSlug}`)
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  getProjectContributors = async (projectId: number, projectSlug: string, pageNum: number, pageSize: number): Promise<Contributors> => {
    try {
      const response = await this.baseService.get(`/project/contributors/${projectId}/${projectSlug}/${pageNum}/${pageSize}`)
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  handleContributor = async (projectId: number, accountId: number): Promise<any> => {
    try {
      const response = await this.baseService.patch(`/project/invite-contributor/${projectId}/${accountId}`)
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  toggleProjectLock = async (projectId: number, isLocked: boolean): Promise<any> => {
    try {
      const response = await this.baseService.patch(`/project/${projectId}/${isLocked}`)
      return response.data
    } catch (error) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  }

  // updateWorkspace = async (
  //   payload: WorkspaceDtoPayload
  // ) => {
  //   try {
  //     const response = await this.baseService.put('/workspace/update', payload)
  //     return response?.data
  //   } catch (error: any) {
  //     const err = error as AxiosError<Error>
  //     return errorHandler(err)
  //   }
  // };

  editProject = async (projectId: number, updateProjectDto: UpdateProjectDto
  ) => {
    try {
      const response = await this.baseService.put(`/project/${projectId}`, updateProjectDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };


}
export default ProjectService

