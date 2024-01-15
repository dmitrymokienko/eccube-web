import { createTheme } from '@mui/material/styles'
import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'

export const muiTheme = createTheme({
  breakpoints: {
    values: {
      // mobile
      xs: 0,
      sm: 481,
      // tablet
      md: 961,
      // desktop
      lg: 1441,
      // desktop Full-HD
      xl: 1921,
    },
  },
  palette,
  components,
  typography,
})
