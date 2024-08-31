import { ITender } from '@/entities/tender/model/interfaces'
import { Nullable } from '@/shared/types/utilities'
import { EditorState } from 'draft-js'

export type PlainTenderProcessForm = Omit<
  ITender,
  'id' | 'workDescription' | 'startPeriod' | 'endPeriod' | 'address'
> & {
  city: string
  postalCode: string
  street: string
  addressSuffix: string
  country: string
  startPeriod: Nullable<Date>
  endPeriod: Nullable<Date>
  workDescription: EditorState
}

// type TenderListQueryFiltersKeys = 'createdById' | 'onlyDrafts' | 'excludeDrafts' | 'limit' | 'offset'
export type TenderListQueryFilters = Record<string, string | number | boolean | undefined | null>
