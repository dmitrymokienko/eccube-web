import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CreatePlainTenderProcessForm } from '../../types'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export interface ITenderPaymentTermFieldProps {
  name?: keyof CreatePlainTenderProcessForm
}

const VALUES = [30, 60, 90]

export function TenderPaymentTermField(props: ITenderPaymentTermFieldProps) {
  const { name = 'paymentTerm' } = props

  const { t } = useTranslation()

  const [visibleAdditionalField, setVisibleAdditionalField] = useState(false)

  const form = useFormContext<CreatePlainTenderProcessForm>()

  const {
    control,
    setValue,
    formState: { errors },
  } = form

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState }) => {
          return (
            <Box>
              <FormControl required error={!!fieldState.error}>
                <FormLabel component="legend">
                  {t('field.create-tender.preferred-payment-terms')}
                </FormLabel>

                <RadioGroup row value={value} onChange={onChange}>
                  {VALUES.map((n) => (
                    <FormControlLabel
                      key={n}
                      value={n}
                      control={<Radio />}
                      label={t('field.create-tender.n_days', { n })}
                      labelPlacement="top"
                      onClick={() => {
                        setVisibleAdditionalField(false)
                      }}
                    />
                  ))}

                  <FormControlLabel
                    // value={0}
                    onClick={() => {
                      setValue(name, undefined)
                      setVisibleAdditionalField(true)
                    }}
                    checked={visibleAdditionalField}
                    control={<Radio />}
                    label={t('field.create-tender.individual-period')}
                    labelPlacement="top"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )
        }}
      />

      {visibleAdditionalField && (
        <TextField
          type="number"
          inputProps={{ min: 1 }}
          defaultValue={VALUES[VALUES.length - 1]}
          label={t('field.create-tender.days')}
          placeholder={t('placeholder.create-tender.days')}
          onChange={(e) => {
            setValue(name, e.target.value)
          }}
          error={!!errors?.[name]}
          helperText={(errors?.[name]?.message as string) ?? ''}
        />
      )}
    </>
  )
}
