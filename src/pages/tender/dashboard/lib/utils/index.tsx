import { ITender } from '@/entities/tender/model/interfaces'
import { ITableColumn, ITableRow } from '@/shared/ui/components/Table/interfaces'
import Typography from '@mui/material/Typography'

export function prepareTenderTable(rows: ITender[]): {
  columns: ITableColumn[]
  rows: ITableRow[]
} {
  return {
    columns: [
      {
        id: 'number',
        title: '#',
        align: 'left',
        sx: { width: '30px' },
      },
      {
        id: 'title',
        title: 'Title',
        align: 'left',
      },
      {
        id: 'shortDescription',
        title: 'Short description',
        align: 'left',
        sx: { width: '40%' },
      },
      {
        id: 'status',
        title: 'Status',
        align: 'right',
        sx: { width: '80px' },
        format: (value) => (
          <Typography
            variant="body1"
            color={(theme) =>
              value === 'published' ? theme.palette.info.main : theme.palette.text.primary
            }
          >
            {`${value}`.toLocaleUpperCase()}
          </Typography>
        ),
      },
    ],

    rows: (rows || []).map((row, index) => ({
      id: row.id,
      number: index + 1,
      title: row.title || '-',
      shortDescription: row.shortDescription || '-',
      status: row.status,
    })),
  }
}
