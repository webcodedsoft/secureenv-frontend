import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'components/Toast'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { services } from 'services'
import { ResetPasswordDto, SetupDto, ValidateEmailDto } from 'services/dtos/auth.dto'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'thunks/account-thunk'

export const useSignUp = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (setupDto: SetupDto) => {
      return services.authService.register(setupDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sign-up'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useVerifyUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ emailAddress, token }: { emailAddress: string, token: string }) => {
      return services.authService.verifyUser(token, emailAddress)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['verify-user'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useForgotPassword = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (validateEmailDto: ValidateEmailDto) => {
      return services.authService.forgotPassword(validateEmailDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['forgot-password'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useResetPassword = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (resetPasswordDto: ResetPasswordDto): Promise<any> => {
      return services.authService.resetPassword(resetPasswordDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reset-password'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      },
    },
  )
}

export const useUserAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useQuery(['user'], services.authService.authenticate, {
    onError: () => {
      dispatch(logout());
      navigate('/auth/login')
    },
    retry: false,
    refetchOnWindowFocus: true
  })
}

