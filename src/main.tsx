import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ThemeRegistry from './shared/ui/providers/ThemeRegistry'
import '@fontsource/roboto-condensed/400.css'
import '@fontsource/roboto-condensed/500.css'
import '@fontsource/roboto-condensed/700.css'
import '@fontsource/bebas-neue/400.css'
import { AuthProvider } from './shared/ui/providers/AuthProvider'
import { router } from './core/routes'
import './core/configs/i18n/config'
import { PopupsProvider } from './shared/ui/providers/PopupsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PopupsProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </PopupsProvider>
      </LocalizationProvider>
    </ThemeRegistry>
  </React.StrictMode>
)
