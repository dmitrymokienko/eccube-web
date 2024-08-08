import { Controller, useFormContext } from 'react-hook-form'
import { CreatePlainTenderProcessForm } from '@/features/tender/create-tender/types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { tenderCreation } from '../model'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { EditorState } from 'draft-js'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { TenderPublishmentField } from './components/TenderPublishmentField'
import { TenderPaymentTermField } from './components/TenderPaymentTermField'

export function CreatePlainTenderForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const form = useFormContext<CreatePlainTenderProcessForm>()

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = form

  const onSubmit = async (data: CreatePlainTenderProcessForm) => {
    const payload = { ...data, country: 'DE', isDraft: false } // due to the fact that readonly/disabled fields are not submitted by RHF
    const res = await tenderCreation.createNewTenderFx(payload)
    await tenderCreation.withdrawalFromDraftFx(res.id)
    navigate('/tender/create/plain/success')
  }

  const onSaveDraft = async () => {
    const data = getValues()
    const payload = { ...data, country: 'DE', isDraft: true } // due to the fact that readonly/disabled fields are not submitted by RHF
    await tenderCreation.createNewTenderFx(payload)
    navigate('/tender/create/plain/success')
  }

  return (
    // TODO: i18n for all labels, placeholders
    <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ py: 4 }}>
        {t('tender.label.new-tender')}
      </Typography>

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

      {/* TODO: DesktopDatePicker - one line;  */}
      {/* TODO: MobileDatePicker - 2 lines */}
      {/* 
      import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
      import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
      */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* TODO: disable all date before 'now()' */}
        <Controller
          name="startDate"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <DatePicker label={t('field.create-tender.start-date')} {...field} />
          )}
        />
        {/* TODO: disable all date before 'startDate' */}
        <Controller
          name="endDate"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <DatePicker label={t('field.create-tender.end-date')} {...field} />
          )}
        />
      </Box>

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
        InputLabelProps={{ shrink: true }} // due to the fact that readonly/disabled fields are empty
      />

      {/* TODO: CUSTOM FIELDS */}

      {/* TODO: 1. Add more actions (highlight, do/undo, text-alignment and etc) */}
      {/* TODO: 2. 3-line by default */}
      <Controller
        name="description"
        control={control}
        rules={{ required: t('validation.required') }}
        render={({ field }) => (
          <RichTextEditor
            showRichBar
            error={!!errors?.description}
            helperText={errors?.description?.message}
            placeholder={t('placeholder.create-tender.rte-project-description')}
            editorState={field.value || EditorState.createEmpty()}
            onChange={field.onChange}
          />
        )}
      />

      <TenderPaymentTermField />

      {/* File uploader */}

      <TenderPublishmentField />

      {/* TODO: other fields */}

      {/* TODO: add confirm dialogs */}
      <Stack spacing={2} sx={{ py: 4 }}>
        <Button type="submit">{t('button.create')}</Button>
        <Button type="button" variant="outlined" onClick={onSaveDraft}>
          {t('button.save-as-draft')}
        </Button>
      </Stack>
    </Stack>
  )
}
