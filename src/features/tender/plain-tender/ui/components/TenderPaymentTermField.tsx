import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CreatePlainTenderProcessForm } from '../../model/interfaces'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export interface ITenderPaymentTermFieldProps {
  name?: keyof CreatePlainTenderProcessForm
}

const VALUES = [30, 60, 90]
const ID = 'eccube-tender-payment-term-radios'

export function TenderPaymentTermField(props: ITenderPaymentTermFieldProps) {
  const { name = 'paymentTerm' } = props

  const { t } = useTranslation()

  const [visibleAdditionalField, setVisibleAdditionalField] = useState(false)

  const form = useFormContext<CreatePlainTenderProcessForm>()

  const {
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = form

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Box>
              <FormControl required error={isSubmitted && !value}>
                <FormLabel component="legend" id={ID} sx={{ pb: 1 }}>
                  {t('field.create-tender.preferred-payment-terms')}
                </FormLabel>

                <RadioGroup row value={value} onChange={onChange} aria-labelledby={ID}>
                  {VALUES.map((n) => (
                    <FormControlLabel
                      key={n}
                      value={n}
                      control={<Radio size="small" />}
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
                    control={<Radio size="small" />}
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
