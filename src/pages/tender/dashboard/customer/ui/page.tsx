import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table } from '@/shared/ui/components/Table/Table'
import { MouseEvent } from 'react'
import { prepareTenderTable } from '../lib/utils'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { useUnit } from 'effector-react'
import { currentUser } from '@/entities/currentUser/model'
import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query'
import { CustomerTenderDrawer } from '@/widgets/TenderDrawers/ui/customerTenderDrawer/CustomerTenderDrawer'

export function CustomerTendersPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const isLoading = useUnit(tenderModel.$isLoading)
  const user = useUnit(currentUser.$info)

  const userId = user?.id

  const isFetching = useIsFetching({ queryKey: ['customerTenderList', userId] })
  const isMutating = useIsMutating({ mutationKey: ['customerTenderList', userId] })

  const { data: list } = useQuery({
    queryKey: ['customerTenderList', userId],
    queryFn: async () => tenderModel.fetchTenderListFx({ onlyAuthorTendersById: userId }),
    enabled: !!userId,
    initialData: [],
  })

  const onCloseDrawer = () => {
    if (!params.has('id')) return
    params.delete('id')
    setParams(params)
  }

  const onRowClick = (_e: MouseEvent<HTMLTableRowElement>, id: string) => {
    params.set('id', id)
    setParams(params)
  }

  const tableData = prepareTenderTable(list)

  const isDrawerOpen = params.has('id')
  const id = params.get('id')

  return (
    <SidebarLayout LoaderProps={{ visible: isLoading || isFetching > 0 || isMutating > 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} py={3}>
        <Button
          fullWidth={false}
          variant="contained"
          type="submit"
          onClick={() => {
            navigate('/tender/create/plain')
          }}
        >
          {t('button.createTender')}``
        </Button>
      </Box>

      <CustomerTenderDrawer id={id} open={isDrawerOpen} onClose={onCloseDrawer} />

      <Table {...tableData} onRowClick={onRowClick} />
    </SidebarLayout>
  )
}
