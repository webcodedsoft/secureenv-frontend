import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import { CreateTeamDto, SetupInviteDto, TeamType } from 'services/dtos/team.dto'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'thunks/account-thunk'
import { QueryParams } from 'types/general.type'

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (payload: CreateTeamDto): Promise<any> => {
      return services.teamService.createTeam(payload)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-team'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useGetTeamList = ({ whereOptions, paginationOptions, enabled }: QueryParams) => {
  return useQuery<TeamType, AxiosError<Error>>(
    ['get-team', paginationOptions, whereOptions],
    () => services.teamService.getTeams(whereOptions, paginationOptions),
    {
      enabled,
      // refetchOnWindowFocus: true,
      retry: false,
      refetchInterval: 4000,
      staleTime: 4000,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ userId }: { userId: number }): Promise<any> => {
      return services.teamService.deleteAccountById(userId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-team'])
        queryClient.invalidateQueries(['delete-team'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useSetupTeamMember = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (setupInviteDto: SetupInviteDto): Promise<any> => {
      return services.teamService.setupTeamMember(setupInviteDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['setup-team'])
        queryClient.invalidateQueries(['get-team'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}
