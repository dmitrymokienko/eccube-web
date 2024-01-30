import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginLayout } from '../../shared/ui/layouts/custom/SeparateLayout/LoginLayout'
import { auth } from '../../entities/auth/model'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../shared/ui/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { useUnit } from 'effector-react'
import { sleep } from '../../shared/libs'

export interface ILoginForm {
  email: string
  password: string
}

export function LoginPage() {
  // TODO: add validation
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isLoading = useUnit(auth.$isLoading)

  const { checkLoginState, userInfo } = useContext(AuthContext)

  const form = useForm<ILoginForm>()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data: ILoginForm) => {
    try {
      await auth.loginFx(data)
      await checkLoginState()
      await sleep(200)
      if (userInfo?.isKybPassed) {
        navigate('/main')
        return
      }
      navigate('/kyb')
    } catch (error) {
      form.setError('email', { message: t('validation.invalid-credentials') })
    }
  }

  return (
    <LoginLayout LoaderProps={{ visible: isLoading }}>
      <Typography variant="h4" component="h1" pb={4}>
        {t('login.page.title')}
      </Typography>

      <FormProvider {...form}>
        <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={t('field.email')}
            placeholder={t('placeholder.email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register('email', {
              required: t('validation.email'),
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
          <Button variant="contained" type="submit" sx={{ marginTop: '24px' }}>
            {t('button.continue')}
          </Button>
        </Stack>
      </FormProvider>
    </LoginLayout>
  )
}
