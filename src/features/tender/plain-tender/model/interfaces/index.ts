import { ITender } from '@/entities/tender/model/interfaces'
import { Nullable } from '@/shared/types/utilities'
import { EditorState } from 'draft-js'

export type PlainTenderProcessForm = Omit<
  ITender,
  | 'id'
  | 'workDescription'
  | 'startPeriod'
  | 'endPeriod'
  | 'address'
  | 'amount'
  | 'jobStartDate'
  | 'jobEndDate'
> & {
  id?: string
  amount: string
  city: string
  postalCode: string
  street: string
  addressSuffix: string
  country: string
  startPeriod: Nullable<Date>
  endPeriod: Nullable<Date>
  jobStartDate: Nullable<Date>
  jobEndDate: Nullable<Date>
  workDescription: EditorState
}

// type TenderListQueryFiltersKeys = 'onlyAuthorTendersById' | 'excludeAuthorTendersById' | 'onlyDrafts' | 'excludeDrafts' | 'limit' | 'page'
export type TenderListQueryFilters = Record<string, string | number | boolean | undefined | null>
