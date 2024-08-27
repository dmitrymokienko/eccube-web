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
        id: 'shortDescription',
        title: 'Short description',
        align: 'left',
      },
      {
        id: 'status',
        title: 'Status',
        align: 'right',
        sx: { width: '40%' },
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
      shortDescription: row.shortDescription || '-',
      status: row.status,
    })),
  }
}
