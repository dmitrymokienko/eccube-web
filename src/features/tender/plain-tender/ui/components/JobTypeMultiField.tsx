import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useFormContext } from 'react-hook-form'
import { PlainTenderProcessForm } from '../../model/interfaces'
import { useTranslation } from 'react-i18next'

// export interface IJobTypeMultiFieldProps {}

export function JobTypeMultiField() {
  const { t } = useTranslation()

  const form = useFormContext<PlainTenderProcessForm>()

  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form

  const jobType = watch('jobType')

  return (
    <Stack spacing={2}>
      <Controller
        name="jobType"
        control={control}
        defaultValue="oneTime"
        render={({ field }) => (
          <RadioGroup row {...field}>
            <FormControlLabel value="oneTime" control={<Radio />} label={t('One-Time Job')} />
            <FormControlLabel value="cyclic" control={<Radio />} label={t('Cyclic Job')} />
          </RadioGroup>
        )}
      />

      {jobType === 'oneTime' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* TODO: disable all date before 'now()' */}
          <Controller
            name="jobStartPeriod"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <DatePicker
                label={t('field.create-tender.start-date')}
                value={field.value}
                inputRef={field.ref}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          {/* TODO: disable all date before 'startPeriod' */}
          <Controller
            name="jobEndPeriod"
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <DatePicker
                label={t('field.create-tender.end-date')}
                value={field.value}
                inputRef={field.ref}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </Box>
      )}

      {jobType === 'cyclic' && (
        <Stack spacing={2}>
          <Controller
            name="jobCycleFrequency"
            control={control}
            defaultValue="1"
            render={({ field }) => (
              <Select {...field} label={t('Cycle Frequency')}>
                <MenuItem value="1">{t('Every Week')}</MenuItem>
                <MenuItem value="2">{t('Every 2 Weeks')}</MenuItem>
                <MenuItem value="3">{t('Every 3 Weeks')}</MenuItem>
                <MenuItem value="4">{t('Every Month')}</MenuItem>
                <MenuItem value="5">{t('Every Quarter')}</MenuItem>
              </Select>
            )}
          />
          <Box>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox {...register(`days`)} />}
                  label={t(day)}
                />
              )
            )}
          </Box>
          {watch('jobCycleFrequency') === '4' && (
            <Controller
              name="dayOfMonth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('Day of Month')}
                  type="number"
                  inputProps={{ min: 1, max: 31 }}
                  error={!!errors?.dayOfMonth}
                />
              )}
            />
          )}
          {watch('jobCycleFrequency') === '5' && (
            <Stack spacing={2}>
              <Controller
                name="quarterMonth"
                control={control}
                render={({ field }) => (
                  <Select {...field} label={t('Month')}>
                    <MenuItem value="1">{t('January')}</MenuItem>
                    <MenuItem value="4">{t('April')}</MenuItem>
                    <MenuItem value="7">{t('July')}</MenuItem>
                    <MenuItem value="10">{t('October')}</MenuItem>
                  </Select>
                )}
              />
              <Controller
                name="dayOfQuarter"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Day of Month')}
                    type="number"
                    inputProps={{ min: 1, max: 31 }}
                    error={!!errors?.dayOfQuarter}
                  />
                )}
              />
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  )
}
