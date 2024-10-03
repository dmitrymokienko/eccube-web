import EccubeBg from '@/shared/assets/images/eccube_bg2.jpeg'
import { useUnit } from 'effector-react'
import { ReactNode, useContext, useMemo } from 'react'
import { SidebarRandomContent, getRandomInt } from '@/shared/ui/layouts/SeparateLayout/lib/utils'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrevPageButton } from '@/shared/ui/components/Button/PrevPageButton'
import { AuthContext } from '@/shared/ui/providers/AuthProvider'
import { FormProvider, useForm } from 'react-hook-form'
import { PlainTenderProcessForm } from '@/features/tender/plain-tender/model/interfaces'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { mapCountryCodeToName } from '@/shared/libs/mappers/countries'
import { Locale } from '@/entities/locale/types'
import {
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '@/shared/ui/layouts/SeparateLayout/ui/SeparateLayout'
import { Currency, PricePer, PriceType } from '@/entities/currencies/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTenderSchema } from '../lib/hooks'

export interface ICreatePlainTenderProcessProps {
  children?: ReactNode
}

export function CreatePlainTenderProcess(props: Readonly<ICreatePlainTenderProcessProps>) {
  const { children } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { loggedIn } = useContext(AuthContext)

  const isLoading = useUnit(tenderModel.$isLoading)

  const tenderSchema = useTenderSchema()

  const form = useForm<PlainTenderProcessForm>({
    defaultValues: {
      startPeriod: null,
      endPeriod: null,
      currency: Currency.EUR,
      pricePer: PricePer.EUR_HOURS,
      priceType: PriceType.GROSS,
      // @ts-expect-error RHF set default value
      publishment: '',
      paymentTerm: '', // important to have default value for RadioGroup
      country: mapCountryCodeToName(Locale.DE),
    },
    resolver: zodResolver(tenderSchema),
  })

  //   const firstPage = useMatch('/tender/plain/step_1')

  const sidebar = useMemo(() => {
    const random = getRandomInt()
    return SidebarRandomContent[random]
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
          <PrevPageButton
            onClick={() => {
              navigate(-1)
            }}
          >
            {t('button.goBack')}
          </PrevPageButton>
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
