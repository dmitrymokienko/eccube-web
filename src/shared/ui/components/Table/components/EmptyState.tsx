import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export function EmptyState(props: { colSpan: number; children?: JSX.Element }) {
  const { children, colSpan } = props

  const Content = children ?? (
    <Typography variant="h3" textAlign="center">
      Empty table
    </Typography>
  )

  return (
    <TableRow tabIndex={-1}>
      <TableCell
        align="center"
        colSpan={colSpan}
        sx={{
          width: '100%',
          padding: '120px 20px',
          margin: '0 auto',
        }}
      >
        {Content}
      </TableCell>
    </TableRow>
  )
}
