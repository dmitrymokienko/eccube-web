import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table } from '@/shared/ui/components/Table/Table'
import { useEffect } from 'react'
import { prepareTenderTable } from '../lib/utils'
import { tender } from '@/features/tender/plain-tender/model'
import { useUnit } from 'effector-react'
import { currentUser } from '@/entities/currentUser/model'

export function TendersPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const user = useUnit(currentUser.$info)
  const tendersList = useUnit(tender.$list)
  const isLoading = useUnit(tender.$isLoading)

  useEffect(() => {
    tender.fetchTenderListFx({ createdById: user?.id })
  }, [])

  const table = prepareTenderTable(tendersList)

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

      <Table {...table} />
    </SidebarLayout>
  )
}
