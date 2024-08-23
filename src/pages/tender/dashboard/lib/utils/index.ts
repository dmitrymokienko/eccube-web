import { ITableColumn, ITableRow } from '@/shared/ui/components/Table/interfaces'

export function prepareTenderTable(): {
  columns: ITableColumn[]
  rows: ITableRow[]
} {
  return {
    columns: [
      {
        id: '0',
        title: 'number',
        align: 'left',
        sx: { width: '40px' },
      },
      {
        id: '1',
        title: 'shortDescription',
        align: 'left',
        sx: { width: '30%' },
        //   format?: (value: string | number) => string | number | JSX.Element
      },
    ],
    rows: [],
  }
}
