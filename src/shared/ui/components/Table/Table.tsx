import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { Nullable } from '@/shared/types/utilities'
import InfoIcon from '@mui/icons-material/Info'
import { ITableProps, ITableRow } from './interfaces'
import { BodyRow, Cell, HeadCell, Row, SortIcon } from './components/Styled'
import { getComparator, stableSort } from './utils'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'
import { TablePaginationActions } from './components/TablePaginationActions'
import TableContainer from '@mui/material/TableContainer'

const DEFAULT_ROWS_PER_PAGE = 10
const DEFAULT_PAGE = 0

export function Table(props: ITableProps) {
  const {
    columns = [],
    rows = [],
    empty: Empty,
    onRowClick,
    defaultPage = DEFAULT_PAGE,
    defaultRowsPerPage = DEFAULT_ROWS_PER_PAGE,
  } = props

  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<string>('')
  const [page, setPage] = useState(defaultPage)

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const [headCellHoveredColumnId, setHeadCellHoveredColumnId] = useState<Nullable<string>>(null)

  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    e.preventDefault()
    onRowClick?.(e, id)
  }

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (property: string) => () => {
    const getSortOption = (): ['asc' | 'desc', string] => {
      if (orderBy !== property) return ['asc', property]
      if (orderBy === property && order === 'asc') return ['desc', property]
      return ['asc', '']
    }
    const [direction, columnName] = getSortOption()
    setOrder(direction)
    setOrderBy(columnName)
  }

  const visibleRows = stableSort<ITableRow>(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const noRows = visibleRows.length === 0

  return (
    <Paper elevation={1} sx={{ borderRadius: '4px', width: '100%' }}>
      <TableContainer>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <Row>
              {columns.map((column) => (
                <HeadCell
                  key={column.id}
                  align={column?.align ?? 'left'}
                  sortDirection={orderBy === column.id ? order : undefined}
                  sx={column?.sx ?? {}}
                  onMouseEnter={() => {
                    setHeadCellHoveredColumnId(column.id)
                  }}
                  onMouseLeave={() => {
                    setHeadCellHoveredColumnId(null)
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={handleRequestSort(column.id)}
                    IconComponent={() => (
                      <SortIcon
                        hover={headCellHoveredColumnId === column.id}
                        active={orderBy === column.id}
                        sx={{
                          transform: !order
                            ? 'rotate(180deg)'
                            : order === 'asc'
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                        }}
                      />
                    )}
                  >
                    <Box display="inline-flex" alignItems="center" gap={1}>
                      <Typography component="span" variant="body1">
                        {column?.title ?? ''}
                      </Typography>

                      {column?.tooltip ? (
                        <Tooltip title={column.tooltip} placement="top">
                          <InfoIcon />
                        </Tooltip>
                      ) : null}
                    </Box>
                  </TableSortLabel>
                </HeadCell>
              ))}
            </Row>
          </TableHead>

          <TableBody>
            {noRows ? <EmptyState colSpan={columns.length}>{Empty}</EmptyState> : null}

            {visibleRows.map((row) => (
              <BodyRow
                hover
                tabIndex={-1}
                key={row.id}
                onClick={(e) => handleRowClick(e, row.id)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => (
                  <Cell
                    key={column.id}
                    align={column?.align ?? 'left'}
                    error={row.error}
                    sx={column.sx}
                  >
                    {column?.format ? column.format(row[column.id]) : row[column.id]}
                  </Cell>
                ))}
              </BodyRow>
            ))}
          </TableBody>

          {rows.length > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </MuiTable>
      </TableContainer>
    </Paper>
  )
}
