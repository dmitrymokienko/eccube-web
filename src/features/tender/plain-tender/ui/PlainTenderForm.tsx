import { Controller, useFormContext } from 'react-hook-form'
import { PlainTenderProcessForm } from '@/features/tender/plain-tender/model/interfaces'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { EditorState } from 'draft-js'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import { TenderPublishmentField } from './components/TenderPublishmentField'
import { TenderPaymentTermField } from './components/TenderPaymentTermField'
import { FilesUploader } from '@/features/uploadFiles/ui/FilesUploader'
import { EmailTextField } from '@/shared/ui/components/TextFields/EmailTextField'
import { PriceMultiField } from './components/PriceMultiField'
import { TenderPublishment } from '@/entities/tender/model/constants'
import { JobTypeMultiField } from './components/JobTypeMultiField'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { IUploadedFile } from '@/entities/uploadFiles/model/interfaces'
import { tenderModel } from '../model'

export interface IPlainTenderFormProps {
  uploadedFiles: IUploadedFile[]
  setFiles: (files: IUploadedFile[]) => void
}

export function PlainTenderForm(props: Readonly<IPlainTenderFormProps>) {
  const { uploadedFiles, setFiles } = props

  const { t } = useTranslation()

  const form = useFormContext<PlainTenderProcessForm>()

  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form

  const publishment = watch('publishment')

  const showEmailField =
    publishment?.includes(TenderPublishment.TEAM) ||
    publishment?.includes(TenderPublishment.INVITATION)

  return (
    <Stack spacing={2}>
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
        slotProps={{
          inputLabel: { shrink: !!watch('title') },
        }}
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
        slotProps={{
          inputLabel: { shrink: !!watch('shortDescription') },
        }}
      />

      {/* PRICE */}

      <PriceMultiField optional />

      <JobTypeMultiField />

      {/* TODO: CUSTOM FIELDS */}

      {/* TODO: 1. Add more actions (highlight, do/undo, text-alignment and etc) */}
      {/* TODO: 2. 3-line by default */}
      <Controller
        name="workDescription"
        control={control}
        rules={{ required: t('validation.required') }}
        render={({ field }) => (
          <RichTextEditor
            showRichBar
            error={!!errors?.workDescription}
            helperText={errors?.workDescription?.message}
            placeholder={t('placeholder.create-tender.rte-project-description')}
            editorState={field.value || EditorState.createEmpty()}
            onChange={field.onChange}
          />
        )}
      />

      {/* TODO: DesktopDatePicker - one line;  */}
      {/* TODO: MobileDatePicker - 2 lines */}
      {/* 
      import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
      import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
      */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pr: 4, position: 'relative' }}>
        {/* TODO: disable all date before 'now()' */}
        <Controller
          name="startPeriod"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <DatePicker
              label={t('field.create-tender.tender-start-date')}
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        {/* TODO: disable all date before 'startPeriod' */}
        <Controller
          name="endPeriod"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <DatePicker
              label={t('field.create-tender.tender-end-date')}
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />

        <Tooltip title={t('field.create-tender.dates-hint')}>
          <span>
            <IconButton
              onClick={() => {
                // TODO: show tooltip on Mobile click
              }}
              color="default"
              sx={{ position: 'absolute', top: '8px', right: '0' }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <FilesUploader
        files={uploadedFiles}
        onUpload={setFiles}
        onDelete={tenderModel.setUploadFilesToDelete}
        sx={{ pb: 2 }}
      />

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
        slotProps={{
          inputLabel: { shrink: !!watch('street') },
        }}
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
        slotProps={{
          inputLabel: { shrink: !!watch('addressSuffix') },
        }}
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
        slotProps={{
          inputLabel: { shrink: !!watch('postalCode') },
        }}
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
        slotProps={{
          inputLabel: { shrink: !!watch('city') },
        }}
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
        slotProps={{
          inputLabel: { shrink: true }, // due to the fact that readonly/disabled fields are empty
        }}
      />

      {/* TODO: mobile view (column) */}
      <TenderPaymentTermField />

      {/* TODO: mobile view (column) */}
      <Box sx={{ pt: 1, pb: 2 }}>
        <TenderPublishmentField />
      </Box>

      {showEmailField && (
        <EmailTextField
          emails={form.getValues('invitedSuppliers')}
          label={t('tender.label.supplier-invitation')}
          placeholder={t('placeholder.create-tender.supplier-invitation')}
          onAddEmail={(emails) => setValue('invitedSuppliers', emails)}
        />
      )}
    </Stack>
  )
}
