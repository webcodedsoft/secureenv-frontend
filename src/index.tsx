import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { store } from 'store/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
const persistor = persistStore(store)

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
)
