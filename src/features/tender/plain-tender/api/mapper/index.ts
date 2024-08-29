import { Locale } from '@/entities/locale/types'
import { omit } from '@/shared/libs/utils/utilities'
import { prepareRTEForSubmit } from '@/shared/ui/components/RichTextEditor/utils'
import { CreatePlainTenderProcessForm } from '../../model/interfaces'
import { convertToTimestamp } from '@/shared/libs/utils/datetime'

export function prepareCreateTenderDtoMapper(data: CreatePlainTenderProcessForm) {
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
