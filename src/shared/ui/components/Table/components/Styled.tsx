import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import StraightIcon from '@mui/icons-material/Straight'

export const Row = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export const Cell = styled(TableCell, {
  shouldForwardProp: (propName: string) => propName !== 'error',
})<{ error?: boolean }>(({ theme, error }) => ({
  // ellipsis
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  // custom
  backgroundColor: 'inherit',
  '&&&': {
    '&:first-of-type': {
      paddingLeft: '24px',
      borderLeft: error ? `2px solid ${theme.palette.error.main}` : undefined,
    },
    backgroundColor: error ? theme.palette.error.light : undefined,
  },
}))

export const HeadCell = styled(Cell)(({ theme }) => ({
  '&&&': {
    backgroundColor: theme.palette.background.paper,
  },
}))

export const BodyRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '&&&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}))

export const SortIcon = styled(StraightIcon, {
  shouldForwardProp: (propName: string) => propName !== 'active' && propName !== 'hover',
})<{ active?: boolean; hover?: boolean }>(({ active, hover }) => ({
  '&&&': {
    opacity: active ? 1 : hover ? 0.5 : 0,
  },
}))
