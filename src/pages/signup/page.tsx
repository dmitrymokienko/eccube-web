import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { currentUser } from '../../entities/currentUser/model'
import { auth } from '../../entities/auth/model'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { omit } from '@/shared/libs/utils/utilities'

const WEAK_PASSWORD = 'password is not strong enough'

export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
}

export function SignUpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useForm<ISignUpForm>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data: ISignUpForm) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: t('validation.password-confirmation'),
      })
      return
    }
    try {
      const payload = omit(['confirmPassword'], { ...data })
      const { id } = await auth.registerFx(payload)
      currentUser.setInfo({ id })
      navigate('/signup/success')
    } catch (e) {
      const error = e as Error
      const message = error?.message ?? ''
      const res = Array.isArray(message) ? message[0] : message
      if (res === WEAK_PASSWORD) {
        form.setError('password', {
          type: 'manual',
          message: t('validation.weak-password'),
        })
        return
      }
      form.setError('email', {
        type: 'manual',
        message: t('validation.email-already-exists'),
      })
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1" pb={4}>
        {t('signup.page.title')}
      </Typography>

      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('field.email')}
            placeholder={t('placeholder.email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', {
              required: t('validation.required'),
              setValueAs: (value) => value.trim(),
            })}
          />

          <TextField
            type="password"
            label={t('field.password')}
            placeholder={t('placeholder.password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            {...register('password', {
              required: t('validation.required'),
              minLength: { value: 8, message: t('validation.short-password') },
              maxLength: { value: 48, message: t('validation.long-password') },
            })}
          />

          <TextField
            type="password"
            label={t('field.confirm-password')}
            placeholder={t('placeholder.confirm-password')}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            {...register('confirmPassword', {
              required: t('validation.required'),
              minLength: { value: 8, message: t('validation.short-password') },
              maxLength: { value: 48, message: t('validation.long-password') },
            })}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.continue')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  )
}
