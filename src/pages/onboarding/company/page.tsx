import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { IOnboardingCompanyData } from '../../../entities/onboarding/types'
import { onboarding } from '../../../entities/onboarding/model'
import { OnboardingLayout } from '../../../shared/ui/layouts/custom/SeparateLayout/OnboardingLayout'
import { PrevPageButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/PrevPageButton'
import { useNavigate } from 'react-router-dom'
import { startMollieOAuth2Api } from '../../../entities/mollie/api'
import Box from '@mui/material/Box'
import { LogoutButton } from '../../../shared/ui/layouts/custom/SeparateLayout/components/LogoutButton'
import { useTranslation } from 'react-i18next'

export function CompanyOnBoardingPage() {
  // TODO: add all fields by https://docs.mollie.com/reference/v2/profiles-api/create-profile
  // TODO: add validation
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { company, createCompany } = useUnit({
    company: onboarding.$company,
    createCompany: onboarding.createOrganizationFx,
  })

  const form = useForm<IOnboardingCompanyData>({
    defaultValues: {
      name: company?.name,
      website: company?.website,
      email: company?.email,
      phone: company?.phone,
    },
  })
  const { handleSubmit, register, formState } = form
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

  const onSubmit = async (data: IOnboardingCompanyData) => {
    onboarding.setCompanyInfo(data)
    try {
      await createCompany()
      startMollieAuthProcess()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <OnboardingLayout
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
              navigate('/onboarding/user')
            }}
          >
            {t('button.prev-step')}
          </PrevPageButton>

          <LogoutButton />
        </Box>
      }
    >
      <Typography variant="h4" component="h1" pb={4}>
        {t('onboarding.company-page.title')}
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
          />
          <TextField
            label={t('field.company-email')}
            placeholder={t('placeholder.company-email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
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
          />
          <TextField
            label={t('field.company-address')}
            placeholder={t('placeholder.company-address')}
            error={!!errors?.address}
            helperText={errors?.address?.message}
            {...register('address', {
              // required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          />
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.next')}
          </Button>
        </Stack>
      </FormProvider>
    </OnboardingLayout>
  )
}
