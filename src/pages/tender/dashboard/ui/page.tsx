import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table } from '@/shared/ui/components/Table/Table'
import { useEffect, MouseEvent } from 'react'
import { prepareTenderTable } from '../lib/utils'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { useUnit } from 'effector-react'
import { currentUser } from '@/entities/currentUser/model'
import { TenderDrawer } from '@/features/tender/plain-tender/ui/TenderDrawer'
import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'

export function TendersPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const user = useUnit(currentUser.$info)
  const tendersList = useUnit(tenderModel.$list)
  const isLoading = useUnit(tenderModel.$isLoading)

  useEffect(() => {
    if (!user) return
    tenderModel.fetchTenderListFx({ onlyAuthorTendersById: user.id })
  }, [user])

  const onCloseDrawer = () => {
    if (!params.has('id')) return
    params.delete('id')
    setParams(params)
  }

  const onRowClick = (_e: MouseEvent<HTMLTableRowElement>, id: string) => {
    params.set('id', id)
    setParams(params)
  }

  const tableData = prepareTenderTable(tendersList)

  const isDrawerOpen = params.has('id')
  const id = params.get('id')

  return (
    <SidebarLayout LoaderProps={{ visible: isLoading }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} py={3}>
        <Button
          fullWidth={false}
          variant="contained"
          type="submit"
          onClick={() => {
            navigate('/tender/create/plain')
          }}
        >
          {t('button.createTender')}
        </Button>
      </Box>

      <TenderDrawer id={id} open={isDrawerOpen} onClose={onCloseDrawer} />

      <Table {...tableData} onRowClick={onRowClick} />
    </SidebarLayout>
  )
}
