import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import { WorkspaceDtoPayload } from 'services/dtos/workspace.dto'
import { useAppDispatch } from 'store/hooks'
import { fetchUserInformation, logout } from 'thunks/account-thunk'

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();

  return useMutation(
    (workspaceDtoPayload: WorkspaceDtoPayload): Promise<any> => {
      return services.workspaceService.createWorkspace(workspaceDtoPayload)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-workspace'])
        dispatch(fetchUserInformation());
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
        dispatch(fetchUserInformation());
      },
    },
  )
}

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();

  return useMutation(
    (workspaceDtoPayload: WorkspaceDtoPayload): Promise<any> => {
      return services.workspaceService.updateWorkspace(workspaceDtoPayload)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['update-workspace'])
        dispatch(fetchUserInformation());
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}


export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();
  return useMutation(
    (): Promise<any> => services.workspaceService.deleteWorkspace(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['delete-workspace'])
        dispatch(fetchUserInformation());
        dispatch(logout())
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
        dispatch(fetchUserInformation());
      },
    },
  )
}
