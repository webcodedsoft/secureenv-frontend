import { AxiosError, AxiosInstance } from 'axios';
import { errorHandler } from 'utils';
import { WorkspaceDtoPayload } from './dtos/workspace.dto';
import { CreateTeamDto, SetupInviteDto, TeamType } from './dtos/team.dto';
import { ApiPaginationOptions } from 'types/general.type';

class TeamService {
  private baseService: AxiosInstance

  constructor (baseService: AxiosInstance) {
    this.baseService = baseService
  }

  createTeam = async (
    payload: CreateTeamDto
  ) => {
    try {
      const response = await this.baseService.post('/team/create', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  updateTeam = async (
    payload: WorkspaceDtoPayload
  ) => {
    try {
      const response = await this.baseService.put('/team/update', payload)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  deleteTeam = async (
  ) => {
    try {
      const response = await this.baseService.delete('/team/delete')
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  getTeams = async (
    whereOptions: Record<string, any>,
    paginationOptions: ApiPaginationOptions,
  ): Promise<TeamType> => {
    try {
      const response = await this.baseService.get('/team/members', {
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

  deleteAccountById = async (userId: number) => {
    try {
      const response = await this.baseService.delete(`/team/delete-team-member/${userId}`)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

  setupTeamMember = async (setupInviteDto: SetupInviteDto) => {
    try {
      const response = await this.baseService.post(`/authentication/setup-team-member`, setupInviteDto)
      return response?.data
    } catch (error: any) {
      const err = error as AxiosError<Error>
      return errorHandler(err)
    }
  };

}
export default TeamService

