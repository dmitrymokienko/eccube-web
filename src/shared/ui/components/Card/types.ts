import { SxProps } from '@mui/material/styles'
import { ElementType, MouseEvent, ReactNode } from 'react'

export interface ICommonCardProps<T = unknown> {
  item?: T
  onClick?: (event: MouseEvent<HTMLElement>, data?: T) => void
  children?: ReactNode | string
  component?: ElementType
  selected?: boolean
  disabled?: boolean
  outlined?: boolean
  sx?: SxProps
}
