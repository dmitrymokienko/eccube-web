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
import 'driver.js/dist/driver.css'
import { AuthProvider } from './shared/ui/providers/AuthProvider'
import { PopupsProvider } from './shared/ui/providers/PopupsProvider'
import { LanguageProvider } from './shared/ui/providers/LanguageProvider'
import { router } from './core/routes'
import './core/configs/i18n/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <LanguageProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <PopupsProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </PopupsProvider>
        </LocalizationProvider>
      </LanguageProvider>
    </ThemeRegistry>
  </React.StrictMode>
)
