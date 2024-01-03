import { CSSProperties } from 'react'
import {
  Palette as MuiPalette,
  PaletteColor as MuiPaletteColor,
  PaletteOptions as MuiPaletteOptions,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
} from '@mui/material/styles'

// Palette

type ConstColors = {
  white: CSSProperties['color']
  black: CSSProperties['color']
}

type BlueColor = {
  0: CSSProperties['color']
  1: CSSProperties['color']
  2: CSSProperties['color']
}

type CustomPaletteColors = {
  blue: BlueColor
  const: ConstColors
}

type CustomPalette = {
  custom: CustomPaletteColors
}

declare module '@mui/material/styles' {
  interface Theme extends Omit<MuiTheme, 'palette'> {
    palette: MuiPalette & CustomPalette
  }

  interface ThemeOptions extends Omit<MuiThemeOptions, 'palette'> {
    palette: MuiPalette & CustomPalette
  }

  interface Palette extends MuiPalette {
    custom: CustomPaletteColors
  }

  interface PaletteOptions extends MuiPaletteOptions {
    custom: CustomPaletteColors
  }

  interface PaletteColor extends MuiPaletteColor, CustomPalette {}

  interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions, CustomPalette {}
}

declare module '@mui/material/Dialog' {
  interface DialogProps {
    variant?: 'modal' | 'confirmation'
  }
}
