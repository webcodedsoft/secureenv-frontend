import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import { ChangeDecryptionPasswordDto, DecryptionPasswordDto } from 'services/dtos/setting.dto'
import { useAppDispatch } from 'store/hooks'
import { fetchUserInformation } from 'thunks/account-thunk'

export const useCreateDecryptionPassword = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();

  return useMutation(
    (decryptionPasswordDto: DecryptionPasswordDto) => {
      return services.settingsService.createDecryptionPassword(decryptionPasswordDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-decryption'])
        dispatch(fetchUserInformation());
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useChangeDecryptionPassword = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();

  return useMutation(
    (changeDecryptionPasswordDto: ChangeDecryptionPasswordDto) => {
      return services.settingsService.changeDecryptionPassword(changeDecryptionPasswordDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['change-decryption'])
        dispatch(fetchUserInformation());
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useValidateDecryptionPassword = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (decryptionPasswordDto: DecryptionPasswordDto) => {
      return services.settingsService.validateDecryptionPassword(decryptionPasswordDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['validate-decryption'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}
