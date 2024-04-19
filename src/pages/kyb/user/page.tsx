import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useUnit } from 'effector-react'
import { kyb } from '../../../entities/kyb/model'
import { IKybData } from '../../../entities/kyb/types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function UserKybPage() {
  // TODO: add validation
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { user, updateData } = useUnit({
    isLoading: kyb.$isLoading,
    user: kyb.$user,
    updateData: kyb.updateUserFx,
  })

  const form = useForm<IKybData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
    },
  })
  const { handleSubmit, register, formState } = form
  const { errors } = formState

  const onSubmit = async (data: IKybData) => {
    kyb.setUserInfo(data)
    try {
      await updateData()
      navigate('/kyb/company')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1" pb={4}>
        {t('kyb.user-info-page.title')}
      </Typography>

      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('field.first-name')}
            placeholder={t('placeholder.first-name')}
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
            {...register('firstName', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            label={t('field.last-name')}
            placeholder={t('placeholder.last-name')}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            {...register('lastName', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextField
            label={t('field.phone')}
            placeholder={t('placeholder.phone')}
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
            {...register('phone', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.next')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  )
}
