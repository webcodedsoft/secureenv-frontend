import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'


import { resetAccountState } from '../reducers/account.reducer'
import { services } from 'services'
import { AppDispatch } from 'store/store'

// 3 args: return type, payload type, thunkAPI config object; contains getState
export const login = createAsyncThunk<any, any>('auth/login', async ({ emailAddress, password }, { rejectWithValue }) => {
  try {
    const response = services.authService.login({ emailAddress, password })
    return response
  } catch (error: any) {
    const err = error as AxiosError
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const logout = () => async (dispatch: AppDispatch) => {
  const response = await services.authService.logout()
  if (response === 'success') {
    // DISPATCH EACH REDUCER'S RESET ACTION HERE
    dispatch(resetAccountState())
  }
}

export const fetchUserInformation = createAsyncThunk<any, void>('users/user', async (_, { rejectWithValue }) => {
  try {
    const response = await services.userService.fetchUserInformation()
    return response
  } catch (err) {
    const error = err as AxiosError
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})
