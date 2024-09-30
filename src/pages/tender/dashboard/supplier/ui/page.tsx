import { useSearchParams } from 'react-router-dom'
import { Table } from '@/shared/ui/components/Table/Table'
import { useEffect, MouseEvent } from 'react'
import { prepareTenderTable } from '../lib/utils'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { useUnit } from 'effector-react'
import { currentUser } from '@/entities/currentUser/model'
import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/ui/SidebarLayout'
import Box from '@mui/material/Box'
import { JobPoolTenderDrawer } from '@/widgets/TenderDrawers/jobPoolTenderDrawer/JobPoolTenderDrawer'

export function JobPoolTendersPage() {
  const [params, setParams] = useSearchParams()

  const user = useUnit(currentUser.$info)
  const tendersList = useUnit(tenderModel.$list)
  const isLoading = useUnit(tenderModel.$isLoading)

  useEffect(() => {
    if (!user) return
    tenderModel.fetchTenderListFx({ excludeAuthorTendersById: user.id, excludeDrafts: true })
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
      <Box sx={{ mt: 11 }} />

      <JobPoolTenderDrawer id={id} open={isDrawerOpen} onClose={onCloseDrawer} />

      <Table {...tableData} onRowClick={onRowClick} />
    </SidebarLayout>
  )
}
