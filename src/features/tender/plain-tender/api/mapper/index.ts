import { Locale } from '@/entities/locale/types'
import { omit } from '@/shared/libs/utils/utilities'
import { prepareRTEForRHF, prepareRTEForSubmit } from '@/shared/ui/components/RichTextEditor/utils'
import { PlainTenderProcessForm } from '../../model/interfaces'
import { convertToTimestamp } from '@/shared/libs/utils/datetime'
import { ITender } from '@/entities/tender/model/interfaces'
import { mapCountryCodeToName } from '@/shared/libs/mappers/countries'
import { Currency, PricePer, PriceType } from '@/entities/currencies/constants'
import { transformAmountToCents, transformCentsToAmount } from '@/shared/libs/utils/currencies'

const tempoOmit = [
  'jobType',
  'jobStartDate',
  'jobEndDate',
  'jobCycleFrequency',
  'jobStartPeriod',
  'jobEndPeriod',
  'jobDays',
  'jobDayOfMonth',
  'jobQuarterMonth',
  'jobDayOfQuarter',
] as Partial<
  keyof Pick<
    PlainTenderProcessForm,
    | 'jobType'
    | 'jobStartDate'
    | 'jobEndDate'
    | 'jobCycleFrequency'
    | 'jobStartPeriod'
    | 'jobEndPeriod'
    | 'jobDays'
    | 'jobDayOfMonth'
    | 'jobQuarterMonth'
    | 'jobDayOfQuarter'
  >
>[]

export function prepareRHFTenderToTenderDtoMapper(data: PlainTenderProcessForm) {
  const {
    street = '',
    addressSuffix = '',
    postalCode = '',
    city = '',
    workDescription,
    paymentTerm,
    publishment,
    startPeriod,
    endPeriod,
    amount,
    ...rest
  } = omit(['country', ...tempoOmit], data)

  return {
    ...rest,
    address: {
      street: street.trim(),
      houseNumber: '32', // TODO: STUB
      suffix: addressSuffix.trim(),
      postalCode: postalCode.trim(),
      city: city.trim(),
      country: Locale.DE, // TODO: TEMPORARY HARDCODED
    },
    amount: transformAmountToCents(amount),
    currency: Currency.EUR, // TODO: TEMPORARY HARDCODED
    startPeriod: convertToTimestamp(startPeriod),
    endPeriod: convertToTimestamp(endPeriod),
    publishment: (publishment || []).filter(Boolean),
    paymentTerm: paymentTerm ? parseInt(paymentTerm, 10) : undefined,
    workDescription: prepareRTEForSubmit(workDescription),
  }
}

export function prepareTenderDtoToRHFMapper(data: ITender): Partial<PlainTenderProcessForm> {
  const {
    address,
    startPeriod,
    endPeriod,
    workDescription,
    paymentTerm,
    publishment,
    invitedSuppliers,
    title,
    shortDescription,
    currency,
    pricePer,
    priceType,
    amount,
  } = omit(['fields', 'uploadedFiles'], data)

  return {
    // main
    title: title || '',
    shortDescription: shortDescription || '',
    workDescription: prepareRTEForRHF(workDescription),
    startPeriod: startPeriod ? new Date(startPeriod) : null,
    endPeriod: endPeriod ? new Date(endPeriod) : null,
    publishment: publishment || '',
    paymentTerm: paymentTerm || '',
    // price
    amount: transformCentsToAmount(amount),
    currency: currency || Currency.EUR,
    pricePer: pricePer || PricePer.EUR_HOURS,
    priceType: priceType || PriceType.GROSS,
    // address
    street: address?.street || '',
    addressSuffix: address?.suffix || '',
    postalCode: address?.postalCode || '',
    city: address?.city || '',
    country: mapCountryCodeToName(Locale.DE),
    // third party
    invitedSuppliers: invitedSuppliers || [],
  }
}
