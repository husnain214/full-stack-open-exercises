import React from 'react'
import {QueryClientProvider, QueryClient} from 'react-query'
import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './notifyContext'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)