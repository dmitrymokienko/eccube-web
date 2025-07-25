import { createTheme } from '@mui/material/styles'
import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'
import type {} from '@mui/x-date-pickers/themeAugmentation' // When using TypeScript 4.x and above
import { Z_INDEX } from '@/shared/libs/constants/style'

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
  zIndex: {
    appBar: Z_INDEX.Soaring,
    drawer: Z_INDEX.Drawer,
    modal: Z_INDEX.Dialog,
  },
})
