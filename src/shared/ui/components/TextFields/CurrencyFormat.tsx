import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { forwardRef } from 'react'

export interface ICurrencyFormatProps extends NumericFormatProps {
  onChange: (event: { target: { value: string; name: string } }) => void
}

export const CurrencyFormat = forwardRef<HTMLElement, ICurrencyFormatProps>((props, ref) => {
  const { onChange, ...other } = props
  console.log('CurrencyFormat', props)
  return (
    <NumericFormat
      {...other}
      fixedDecimalScale
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      // prefix="€"
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name || '',
            value: values.value,
          },
        })
      }}
    />
  )
})
