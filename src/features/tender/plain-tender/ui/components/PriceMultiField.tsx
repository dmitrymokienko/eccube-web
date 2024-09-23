import { PricePer, PriceType } from '@/entities/currencies/constants'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Controller, useFormContext } from 'react-hook-form'
import { PlainTenderProcessForm } from '../../model/interfaces'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { CurrencyFormat } from '@/shared/ui/components/TextFields/CurrencyFormat'

export interface IPriceMultiFieldProps {
  optional?: boolean
}

// TODO: Add validation for min/max price

export function PriceMultiField(props: Readonly<IPriceMultiFieldProps>) {
  const { optional } = props

  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
  } = useFormContext<PlainTenderProcessForm>()

  const errorText = optional
    ? null
    : (errors.amount?.message ?? errors.pricePer?.message ?? errors.priceType?.message)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 100px',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* used Controller due to the fact that 'react-number-format' inside */}
        <Controller
          name="amount"
          control={control}
          rules={{ required: optional ? undefined : t('validation.required') }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('common.price')}
              placeholder="0"
              error={!!errors.amount}
              slotProps={{
                input: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  inputComponent: CurrencyFormat as any,
                },
              }}
              sx={{
                '&': {
                  margin: '0',
                },
                '& input': {
                  paddingTop: '10px',
                  paddingBottom: '10px',
                },
                '.MuiFormHelperText-root': {
                  display: 'none',
                },
              }}
            />
          )}
        />

        <Controller
          name={`pricePer`}
          control={control}
          render={({ field, fieldState }) => (
            <Select {...field} error={!!fieldState.error}>
              <MenuItem value={PricePer.EUR}>€</MenuItem>
              <MenuItem value={PricePer.EUR_M2}>€/m²</MenuItem>
              <MenuItem value={PricePer.EUR_HOURS}>€/h</MenuItem>
            </Select>
          )}
        />

        <Controller
          name={`priceType`}
          control={control}
          render={({ field, fieldState }) => (
            <Select {...field} error={!!fieldState.error}>
              <MenuItem value={PriceType.GROSS}>{t('common.gross')}</MenuItem>
              <MenuItem value={PriceType.NET}>{t('common.net')}</MenuItem>
            </Select>
          )}
        />
      </Box>

      <Typography variant="caption" color="error.main" sx={{ px: '14px' }}>
        {errorText ?? ' '}
      </Typography>
    </Box>
  )
}
