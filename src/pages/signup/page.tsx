import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { omit } from 'ramda'
import { FormProvider, useForm } from 'react-hook-form'
import { currentUser } from '../../entities/currentUser/model'
import { auth } from '../../entities/auth/model'
import { UserType } from '../../entities/currentUser/types'
import { SignUpLayout } from '../../shared/ui/layouts/SeparateLayout/custom/SignUpLayout'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'

export interface ISignUpForm {
  email: string
  password: string
  confirmPassword: string
  isSupplier: boolean
}

// TODO: add validation
export function SignUpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isLoading = useUnit(auth.$isLoading)

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
      const type = data.isSupplier ? UserType.Supplier : UserType.Customer
      const payload = omit(['confirmPassword', 'isSupplier'], { ...data, type })
      const { id } = await auth.registerFx(payload)
      currentUser.setInfo({ id })
      navigate('/signup/success')
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: t('validation.email-already-exists'),
      })
    }
  }

  return (
    <SignUpLayout LoaderProps={{ visible: isLoading }}>
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
              minLength: 6,
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
              minLength: 6,
            })}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register('isSupplier')} />}
              label={t('signup.supplier.checkbox')}
            />
          </FormGroup>
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.continue')}
          </Button>
        </Stack>
      </FormProvider>
    </SignUpLayout>
  )
}
