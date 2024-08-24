import { Action, AnyAction, combineReducers, configureStore, Reducer, ThunkAction } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import accountReducer from '../reducers/account.reducer'

export const combinedReducer = combineReducers({
  account: accountReducer,
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return combinedReducer(state, action)
}

const persistConfig = {
  key: 'securevar',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
