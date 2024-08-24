
import { UserInfoDto } from 'services/dtos/user.dto';
import { RootState } from 'store/store';

export const selectAccountDetails = (state: RootState): { user: UserInfoDto; error: any } => {
  return state.account
}

export const selectIsAuthenticated = (state: RootState) => {
  return state.account.isAuthenticated
}

export const selecthasLoadedAccountDetails = (state: RootState) => {
  return state.account
}

export const selectUserInformation = (state: RootState): UserInfoDto => {
  return state.account.user
}

export const selectAccountError = (state: RootState) => {
  return state.account.error
}
