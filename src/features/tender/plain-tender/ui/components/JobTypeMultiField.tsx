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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

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
          <RadioGroup row {...field} sx={{ gap: 4 }}>
            <FormControlLabel value="oneTime" control={<Radio />} label={t('One-Time Job')} />
            <FormControlLabel value="cyclic" control={<Radio />} label={t('Cyclic Job')} />
          </RadioGroup>
        )}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Controller
          name="jobStartDate"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <DatePicker
              disablePast
              label={t('field.create-tender.start-date')}
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
              slotProps={{
                textField: {
                  error: !!errors?.jobStartDate,
                  helperText: errors?.jobStartDate?.message,
                },
              }}
            />
          )}
        />
        {/* TODO: disable all date before 'startPeriod' */}
        <Controller
          name="jobEndDate"
          control={control}
          rules={{ required: jobType === 'oneTime' ? t('validation.required') : undefined }}
          render={({ field }) => (
            <DatePicker
              disablePast
              label={t('field.create-tender.end-date')}
              value={field.value}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
              slotProps={{
                textField: {
                  error: !!errors?.jobEndDate,
                  helperText: errors?.jobEndDate?.message,
                },
              }}
            />
          )}
        />
      </Box>

      {jobType === 'cyclic' && (
        <Stack spacing={2}>
          <Controller
            name="jobCycleFrequency"
            control={control}
            defaultValue="4"
            render={({ field }) => (
              <FormControl>
                <InputLabel id="period-select-label">{t('Cycle Frequency')}</InputLabel>
                <Select {...field} id="period-select-label" label={t('Cycle Frequency')}>
                  <MenuItem value="1">{t('Every Week')}</MenuItem>
                  <MenuItem value="2">{t('Every 2 Weeks')}</MenuItem>
                  <MenuItem value="3">{t('Every 3 Weeks')}</MenuItem>
                  <MenuItem value="4">{t('Every Month')}</MenuItem>
                  <MenuItem value="5">{t('Every Quarter')}</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Box>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox {...register(`jobDays`)} />}
                  label={t(day)}
                />
              )
            )}
          </Box>

          {watch('jobCycleFrequency') === '4' && (
            <Controller
              name="jobDayOfMonth"
              control={control}
              rules={{
                required: watch('jobCycleFrequency') === '4' ? t('validation.required') : undefined,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('Day of Month')}
                  type="number"
                  slotProps={{ htmlInput: { min: 1, max: 31 } }}
                  error={!!errors?.jobDayOfMonth}
                />
              )}
            />
          )}

          {watch('jobCycleFrequency') === '5' && (
            <Stack spacing={2}>
              <Controller
                name="jobQuarterMonth"
                control={control}
                rules={{
                  required:
                    watch('jobCycleFrequency') === '5' ? t('validation.required') : undefined,
                }}
                defaultValue="1"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="job-select-month">{t('Month')}</InputLabel>
                    <Select {...field} label={t('Month')} id="job-select-month">
                      <MenuItem value="1">{t('January')}</MenuItem>
                      <MenuItem value="4">{t('April')}</MenuItem>
                      <MenuItem value="7">{t('July')}</MenuItem>
                      <MenuItem value="10">{t('October')}</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="jobDayOfQuarter"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Day of Month')}
                    type="number"
                    slotProps={{ htmlInput: { min: 1, max: 31 } }}
                    error={!!errors?.jobDayOfQuarter}
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
