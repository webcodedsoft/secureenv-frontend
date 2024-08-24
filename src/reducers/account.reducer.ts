import { createSlice } from '@reduxjs/toolkit'

import { fetchUserInformation, login } from '../thunks/account-thunk'
import { UserInfoDto, initialUserValue } from 'services/dtos/user.dto'

// Define the state of the slice as an object
interface AccountState {
  // TO-DO: User object might change depending on the amount of data needed
  user: UserInfoDto | null
  isLoadingAccountDetails: boolean
  hasLoadedAccountDetails: boolean
  error: any
  isAuthenticated: boolean
}

// Define an initial state
const initialState: AccountState = {
  user: initialUserValue,
  isLoadingAccountDetails: false,
  hasLoadedAccountDetails: false,
  error: null,
  isAuthenticated: false,
}

// Create a slice containing the configuration of the state
// and the reducers functions
const accountReducer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountState(state) {
      // Reset the user field to null
      state.user = null
      state.isLoadingAccountDetails = false
      state.hasLoadedAccountDetails = false
      state.error = null
      state.isAuthenticated = false
    },

    resetAccountError(state) {
      state.error = null
      state.isLoadingAccountDetails = false
    },
  },
  // extraReducers for API calls, reducers for basic operations
  extraReducers: (builder) => {
    // `login.pending` is being fired:
    builder.addCase(login.pending, (state) => {
      state.isLoadingAccountDetails = true
      state.error = null
    })

    // When a server responses with the data,
    // `login.fulfilled` is fired:
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log('🚀 ~ builder.addCase ~ payload:', payload)
      state.user = { ...payload }
      state.isAuthenticated = true
      state.isLoadingAccountDetails = false
      state.hasLoadedAccountDetails = true
    })

    // When a server responses with an error:
    builder.addCase(login.rejected, (state, { error }) => {
      if (error) {
        // The payload error is of the format:
        // { name: 'UnauthorizedError', message: 'Error message', errors: [] }
        state.error = error.message
      }
      state.isAuthenticated = false
      state.isLoadingAccountDetails = false
      state.hasLoadedAccountDetails = false
    })

    builder.addCase(fetchUserInformation.pending, (state) => {
      state.isLoadingAccountDetails = true
      state.error = null
    })

    // When a server responses with the data,
    // `login.fulfilled` is fired:
    builder.addCase(fetchUserInformation.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload,
        businessColor: payload?.business?.primaryColor ?? '#DF4308',
      }
      state.isLoadingAccountDetails = false
      state.hasLoadedAccountDetails = true
    })

    // When a server responses with an error:
    builder.addCase(fetchUserInformation.rejected, (state, { payload }: { payload: any }) => {
      if (payload) {
        state.error = payload.message
      }
      state.isLoadingAccountDetails = false
      state.hasLoadedAccountDetails = false
    })
  },
})

// Export each reducers function defined in createSlice
export const { resetAccountState, resetAccountError } = accountReducer.actions

// Export default the slice reducer
export default accountReducer.reducer
