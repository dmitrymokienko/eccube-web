import { ITender } from '@/entities/tender/model/interfaces'
import { ITableColumn, ITableRow } from '@/shared/ui/components/Table/interfaces'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { t } from 'i18next'

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
        title: t('table.tender.header.title'),
        align: 'left',
      },
      {
        id: 'shortDescription',
        title: t('table.tender.header.shortDescription'),
        align: 'left',
        sx: { width: '40%' },
      },
      {
        id: 'status',
        title: t('table.tender.header.status'),
        align: 'right',
        sx: { width: '80px' },
        format: (value) => <StatusText value={value} />,
      },
    ],

    rows: (rows || []).map((row, index) => ({
      id: row.id,
      number: index + 1,
      title: row.title || '—',
      shortDescription: row.shortDescription || '—',
      status: row.status,
    })),
  }
}

function StatusText(props: { value: string | number }) {
  const { value } = props

  const theme = useTheme()

  return (
    <Typography
      variant="body1"
      color={value === 'published' ? theme.palette.info.main : theme.palette.text.primary}
    >
      {`${value}`.toLocaleUpperCase()}
    </Typography>
  )
}
