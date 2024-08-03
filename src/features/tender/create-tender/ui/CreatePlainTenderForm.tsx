import { Controller, useFormContext } from 'react-hook-form'
import { CreatePlainTenderProcessForm } from '@/features/tender/create-tender/types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { tenderCreation } from '../model'
import { useEffect } from 'react'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { EditorState } from 'draft-js'

export function CreatePlainTenderForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useFormContext<CreatePlainTenderProcessForm>()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form

  useEffect(() => {
    setValue('country', t('common.Germany'))
  }, [])

  const onSubmit = async (data: CreatePlainTenderProcessForm) => {
    const payload = { ...data, country: 'DE' } // due to the fact that readonly/disabled fields are not submitted by RHF
    const res = await tenderCreation.createNewTenderFx(payload) //  { isDraft }
    await tenderCreation.withdrawalFromDraftFx(res.id)
    navigate('/tender/create/plain/success')
  }

  return (
    <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={t('field.create-tender.title')}
        placeholder={t('placeholder.create-tender.title')}
        error={!!errors?.title}
        helperText={errors?.title?.message}
        {...register('title', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 120,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('title') }}
      />

      <TextField
        label={t('field.create-tender.short-description')}
        placeholder={t('placeholder.create-tender.short-description')}
        error={!!errors?.shortDescription}
        helperText={errors?.shortDescription?.message}
        {...register('shortDescription', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 300,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('shortDescription') }}
      />

      {/* TODO: start end DatePicker */}

      {/* ADDRESS */}

      <TextField
        label={t('field.create-tender.street')}
        placeholder={t('placeholder.create-tender.street')}
        error={!!errors?.street}
        helperText={errors?.street?.message}
        {...register('street', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 200,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('street') }}
      />

      <TextField
        label={t('field.create-tender.address-suffix')}
        placeholder={t('placeholder.create-tender.address-suffix')}
        error={!!errors?.addressSuffix}
        helperText={errors?.addressSuffix?.message}
        {...register('addressSuffix', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 200,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('addressSuffix') }}
      />

      <TextField
        label={t('field.create-tender.postal-code')}
        placeholder={t('placeholder.create-tender.postal-code')}
        error={!!errors?.postalCode}
        helperText={errors?.postalCode?.message}
        {...register('postalCode', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          // TODO: what is the correct length for postal code?
          validate: (value = '') => value.trim().length < 5,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('postalCode') }}
      />

      <TextField
        label={t('field.create-tender.city')}
        placeholder={t('placeholder.create-tender.city')}
        error={!!errors?.city}
        helperText={errors?.city?.message}
        {...register('city', {
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 200,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('city') }}
      />

      <TextField
        label={t('field.create-tender.country')}
        placeholder={t('placeholder.create-tender.country')}
        error={!!errors?.country}
        helperText={errors?.country?.message}
        {...register('country', {
          disabled: true,
          required: t('validation.required'),
          setValueAs: (value = '') => value.trim(),
          validate: (value = '') => value.trim().length < 200,
        })}
        // https://github.com/react-hook-form/react-hook-form/issues/220
        InputLabelProps={{ shrink: !!watch('country') }}
      />

      {/* TODO: CUSTOM FIELDS */}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            showRichBar
            editorState={field.value || EditorState.createEmpty()}
            onChange={field.onChange}
          />
        )}
      />

      {/* TODO: other fields */}
    </Stack>
  )
}
