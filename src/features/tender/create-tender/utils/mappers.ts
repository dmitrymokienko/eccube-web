import { Locale } from '@/entities/locale/types'
import { CreatePlainTenderProcessForm } from '../types'
import { omit } from '@/shared/libs/utils/utilities'
import { convertEditorStateToString } from '@/shared/ui/components/RichTextEditor/utils'

export function prepareCreateTenderDtoMapper(data: CreatePlainTenderProcessForm) {
  const { street, addressSuffix, postalCode, city, workDescription, ...rest } = omit(
    ['country'],
    data
  )
  return {
    ...rest,
    address: {
      street: street.trim(),
      // houseNumber: houseNumber.trim(),
      suffix: addressSuffix.trim(),
      postalCode: postalCode.trim(),
      city: city.trim(),
      country: Locale.DE,
    },
    // TODO: tempo
    workDescription: convertEditorStateToString(workDescription),
  }
}
