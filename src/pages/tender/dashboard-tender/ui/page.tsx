import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function TendersPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <SidebarLayout>
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

      <Typography variant="h1" textAlign="center" sx={{ marginTop: '32px' }}>
        Tender list
      </Typography>
    </SidebarLayout>
  )
}
