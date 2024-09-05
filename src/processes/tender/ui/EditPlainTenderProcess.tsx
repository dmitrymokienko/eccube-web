import {
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '@/shared/ui/layouts/SeparateLayout/SeparateLayout'
import EccubeBg from '@/shared/assets/images/eccube_bg2.jpeg'
import { useUnit } from 'effector-react'
import { ReactNode, useContext, useEffect, useMemo } from 'react'
import { SidebarRandomContent, getRandomInt } from '@/shared/ui/layouts/SeparateLayout/lib/utils'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrevPageButton } from '@/shared/ui/components/Button/PrevPageButton'
import { AuthContext } from '@/shared/ui/providers/AuthProvider'
import { FormProvider, useForm } from 'react-hook-form'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { prepareTenderDtoToRHFMapper } from '@/features/tender/plain-tender/api/mapper'
import { PlainTenderProcessForm } from '@/features/tender/plain-tender/model/interfaces'

export interface IEditPlainTenderProcessProps {
  children?: ReactNode
}

export function EditPlainTenderProcess(props: IEditPlainTenderProcessProps) {
  const { children } = props

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const { loggedIn } = useContext(AuthContext)

  const tender = useUnit(tenderModel.$currentTender)
  const isLoading = useUnit(tenderModel.$isLoading)

  const form = useForm<PlainTenderProcessForm>({
    defaultValues: tender ? prepareTenderDtoToRHFMapper(tender) : undefined,
  })

  const sidebar = useMemo(() => {
    const random = getRandomInt()
    return SidebarRandomContent[random]
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await tenderModel.fetchByIdFx(id)
      form.reset(prepareTenderDtoToRHFMapper(data))
    }
    if (!tender) fetchData()
  }, [tender])

  useEffect(() => {
    return () => {
      tenderModel.reset()
    }
  }, [])

  return (
    <SeparateLayout
      LoaderProps={{ visible: isLoading || loggedIn === null }}
      Header={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <PrevPageButton onClick={() => navigate(-1)}>{t('button.goBack')}</PrevPageButton>
        </Box>
      }
      Sidebar={
        <Box pt={6}>
          <Typography variant="h5" component="h1" color="custom.const.white">
            {t(sidebar?.title ?? '')}
          </Typography>
          <Typography variant="body1" color="custom.const.white" mt={5}>
            {t(sidebar?.description ?? '')}
          </Typography>
        </Box>
      }
      SideBarProps={{
        sx: {
          backgroundImage: `url(${EccubeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      <FormProvider {...form}>{children || <Outlet />}</FormProvider>
    </SeparateLayout>
  )
}
