import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { IKybCompanyData } from '../../../entities/kyb/types'
import { kyb } from '../../../entities/kyb/model'
import { KybLayout } from '../../../shared/ui/layouts/custom/SeparateLayout/KybLayout'
import { PrevPageButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useNavigate } from 'react-router-dom'
import { startMollieOAuth2Api } from '../../../entities/mollie/api'
import Box from '@mui/material/Box'
import { LogoutButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton'
import { useTranslation } from 'react-i18next'
import { isDevelopment } from '../../../core/libs/utils'

export function CompanyProfileKybPage() {
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
      // name: company?.name,
      website: company?.website,
      email: company?.email,
      phone: company?.phone,
      businessCategory: company?.businessCategory,
    },
  })
  const { handleSubmit, register, formState, setValue, watch } = form
  const { errors } = formState

  const startMollieAuthProcess = async () => {
    try {
      const data = await startMollieOAuth2Api()()
      const { authorizationUri } = data || {}
      window.location.assign(authorizationUri)
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = async (data: IKybCompanyData) => {
    kyb.setCompanyInfo(data)
    try {
      await kyb.createOrganizationFx()
      startMollieAuthProcess()
    } catch (e) {
      console.log(e)
    }
  }

  const setTestData = () => {
    // setValue('name', 'Mollie')
    setValue('email', 'info@mollie.com')
    setValue('website', 'https://test.com')
    setValue('phone', '+31208202070')
    setValue('businessCategory', 'MONEY_SERVICES')
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
          {/* <TextField
            label={t('field.company-name')}
            placeholder={t('placeholder.company-name')}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register('name', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          /> */}
          <TextField
            label={t('field.company-email')}
            placeholder={t('placeholder.company-email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            // https://github.com/react-hook-form/react-hook-form/issues/220
            InputLabelProps={{ shrink: !!watch('email') }}
          />
          <TextField
            label={t('field.company-website')}
            placeholder={t('placeholder.company-website')}
            error={!!errors?.website}
            helperText={errors?.website?.message}
            {...register('website', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('website') }}
          />
          <TextField
            label={t('field.company-phone')}
            placeholder={t('placeholder.company-phone')}
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
            {...register('phone', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('phone') }}
          />
          {/* TODO: create select component */}
          <TextField
            label={t('field.company-business-category')}
            placeholder={t('placeholder.company-business-category')}
            error={!!errors?.businessCategory}
            helperText={errors?.businessCategory?.message}
            {...register('businessCategory', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
            InputLabelProps={{ shrink: !!watch('businessCategory') }}
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
