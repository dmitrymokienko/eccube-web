import { Locale } from '@/entities/locale/types'
import { omit } from '@/shared/libs/utils/utilities'
import { prepareRTEForRHF, prepareRTEForSubmit } from '@/shared/ui/components/RichTextEditor/utils'
import { PlainTenderProcessForm } from '../../model/interfaces'
import { convertToTimestamp } from '@/shared/libs/utils/datetime'
import { ITender } from '@/entities/tender/model/interfaces'

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
    ...rest
  } = omit(['country'], data)

  return {
    ...rest,
    address: {
      street: street.trim(),
      houseNumber: '32', // TODO: STUB
      suffix: addressSuffix.trim(),
      postalCode: postalCode.trim(),
      city: city.trim(),
      country: Locale.DE,
    },
    startPeriod: convertToTimestamp(startPeriod),
    endPeriod: convertToTimestamp(endPeriod),
    publishment: publishment || [],
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
    title,
    shortDescription,
  } = omit(['id', 'status', 'fields', 'uploadedFiles'], data)

  return {
    title: title || '',
    shortDescription: shortDescription || '',
    workDescription: prepareRTEForRHF(workDescription),
    street: address?.street || '',
    addressSuffix: address?.suffix || '',
    postalCode: address?.postalCode || '',
    city: address?.city || '',
    startPeriod: startPeriod ? new Date(startPeriod) : null,
    endPeriod: endPeriod ? new Date(endPeriod) : null,
    publishment: publishment || '',
    paymentTerm: paymentTerm || '',
  }
}
