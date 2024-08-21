import { Locale } from '@/entities/locale/types'
import { omit } from '@/shared/libs/utils/utilities'
import { prepareRTEForSubmit } from '@/shared/ui/components/RichTextEditor/utils'
import { CreatePlainTenderProcessForm } from '../../model/interfaces'

export function prepareCreateTenderDtoMapper(data: CreatePlainTenderProcessForm) {
  const { street, addressSuffix, postalCode, city, workDescription, paymentTerm, ...rest } = omit(
    ['country'],
    data
  )
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
    paymentTerm: parseInt(paymentTerm, 10),
    workDescription: prepareRTEForSubmit(workDescription),
  }
}
