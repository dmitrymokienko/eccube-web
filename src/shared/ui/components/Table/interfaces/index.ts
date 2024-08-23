import { SxProps, Theme } from '@mui/material/styles'
import { MouseEvent } from 'react'

export interface ITableColumn {
  id: string
  title: string | JSX.Element
  align?: 'left' | 'right' | 'center'
  sort?: 'asc' | 'desc'
  tooltip?: string | JSX.Element
  format?: (value: string | number) => string | number | JSX.Element
  sx?: SxProps<Theme>
}

export type ITableRow = Record<ITableColumn['id'], string | number> & {
  id: string
  error?: boolean
}

export interface ITableProps {
  // name: string
  columns: ITableColumn[]
  rows: ITableRow[]
  empty?: JSX.Element
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, id: string) => void
  defaultPage?: number
  defaultRowsPerPage?: number
}
