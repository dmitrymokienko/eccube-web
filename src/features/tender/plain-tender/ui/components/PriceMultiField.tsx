import { Currency, PricePer, PriceType } from '@/entities/currencies/constants'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Controller, useFormContext } from 'react-hook-form'
import { PlainTenderProcessForm } from '../../model/interfaces'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { CurrencyFormat } from '@/shared/ui/components/TextFields/CurrencyFormat'

// TODO: Add validation for min/max price

export function PriceMultiField() {
  const { t } = useTranslation()
  const theme = useTheme()

  const {
    control,
    formState: { errors },
  } = useFormContext<PlainTenderProcessForm>()

  const error = !!errors.amount || !!errors.currency || !!errors.pricePer || !!errors.priceType

  const errorText =
    errors.amount?.message ||
    errors.currency?.message ||
    errors.pricePer?.message ||
    errors.priceType?.message

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        variant="body1"
        sx={{
          color: error ? theme.palette.error.main : `rgba(0, 0, 0, 0.6)`,
          position: 'absolute',
          top: '-16px',
          left: '14px',
        }}
      >
        {t('common.price')} *
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr 100px 100px',
          alignItems: 'center',
          gap: 1,
          pt: '16px',
        }}
      >
        <Controller
          name={`currency`}
          control={control}
          render={({ field, fieldState }) => (
            <Select {...field} error={!!fieldState.error}>
              <MenuItem value={Currency.EUR}>€</MenuItem>
              {/* <MenuItem value={Currency.USD}>$</MenuItem> */}
            </Select>
          )}
        />

        {/* used Controller due to the fact that 'react-number-format' inside */}
        <Controller
          name="amount"
          control={control}
          rules={{ required: t('validation.required') }}
          render={({ field }) => (
            <TextField
              {...field}
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
