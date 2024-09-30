import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import { ResetPasswordPayload, UpdateInformationDto } from 'services/dtos/user.dto'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'thunks/account-thunk'

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (updateInformationDto: UpdateInformationDto) => {
      return services.userService.updateAccountInformation(updateInformationDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['update-profile'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (resetPasswordPayload: ResetPasswordPayload) => {
      return services.userService.changePassword(resetPasswordPayload)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['change-password'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();
  return useMutation(
    (): Promise<any> => {
      return services.userService.deleteAccount()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['delete-account'])
        dispatch(logout())
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}
