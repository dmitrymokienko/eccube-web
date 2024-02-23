import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { IKybCompanyData } from '../../../entities/kyb/types'
import { kyb } from '../../../entities/kyb/model'
import { KybLayout } from '../../../shared/ui/layouts/SeparateLayout/custom/KybLayout'
import { PrevPageButton } from '../../../shared/ui/components/Button/PrevPageButton'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { LogoutButton } from '../../../shared/ui/components/Button/LogoutButton'
import { useTranslation } from 'react-i18next'
import { isDevelopment } from '../../../core/libs/utils'

export function CompanyKybPage() {
  // TODO: add all fields by https://docs.mollie.com/reference/v2/profiles-api/create-profile
  // TODO: add validation
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isLoading, company } = useUnit({
    isLoading: kyb.$isLoading,
    company: kyb.$company,
  })

  const form = useForm<IKybCompanyData>({
    defaultValues: {
      name: company?.name,
      registrationNumber: company?.registrationNumber,
      vatNumber: company?.vatNumber,
      address: {
        streetAndNumber: company?.address?.streetAndNumber,
        postalCode: company?.address?.postalCode,
        city: company?.address?.city,
        country: company?.address?.country ?? 'DE',
      },
    },
  })
  const { handleSubmit, register, formState, setValue, watch } = form
  const { errors } = formState

  const onSubmit = async (data: IKybCompanyData) => {
    kyb.setCompanyInfo(data)
    // await currentUser.updateOrganizationFx(data)
    navigate('/kyb/profile')
  }

  const setTestData = () => {
    setValue('name', 'Super cleaning')
    setValue('address', {
      streetAndNumber: 'Keizersgracht 126',
      postalCode: '1015 CW',
      city: 'Munich',
      country: 'DE',
    })
    setValue('registrationNumber', '30204462')
    setValue('vatNumber', 'NL815839091B01')
  }

  return (
    <KybLayout
      LoaderProps={{ visible: isLoading }}
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
              navigate('/kyb/user')
            }}
          >
            {t('button.prev-step')}
          </PrevPageButton>

          <LogoutButton />
        </Box>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        {t('kyb.company-page.title')}
      </Typography>
      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('field.company-name')}
            placeholder={t('placeholder.company-name')}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register('name', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            // https://github.com/react-hook-form/react-hook-form/issues/220
            InputLabelProps={{ shrink: !!watch('name') }}
          />
          <TextField
            label={t('field.registration-number')}
            placeholder={t('placeholder.registration-number')}
            error={!!errors?.registrationNumber}
            helperText={errors?.registrationNumber?.message}
            {...register('registrationNumber', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('registrationNumber') }}
          />
          <TextField
            label={t('field.vat-number')}
            placeholder={t('placeholder.vat-number')}
            error={!!errors?.vatNumber}
            helperText={errors?.vatNumber?.message}
            {...register('vatNumber', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('vatNumber') }}
          />
          {/* address */}
          <TextField
            label={t('field.street-and-number')}
            placeholder={t('placeholder.street-and-number')}
            error={!!errors?.address?.streetAndNumber}
            helperText={errors?.address?.streetAndNumber?.message}
            {...register('address.streetAndNumber', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('address.streetAndNumber') }}
          />
          <TextField
            label={t('field.postal-code')}
            placeholder={t('placeholder.postal-code')}
            error={!!errors?.address?.postalCode}
            helperText={errors?.address?.postalCode?.message}
            {...register('address.postalCode', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('address.postalCode') }}
          />
          <TextField
            label={t('field.city')}
            placeholder={t('placeholder.city')}
            error={!!errors?.address?.city}
            helperText={errors?.address?.city?.message}
            {...register('address.city', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('address.city') }}
          />
          {/* TODO: select */}
          <TextField
            label={t('field.country')}
            placeholder={t('placeholder.country')}
            error={!!errors?.address?.country}
            helperText={errors?.address?.country?.message}
            {...register('address.country', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('address.country') }}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.next')}
          </Button>

          {isDevelopment() && (
            <Button
              variant="outlined"
              type="button"
              sx={{ marginTop: '24px' }}
              onClick={setTestData}
            >
              Test data
            </Button>
          )}
        </Stack>
      </FormProvider>
    </KybLayout>
  )
}
