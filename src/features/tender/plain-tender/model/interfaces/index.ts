import { ITender } from '@/entities/tender/model/interfaces'
import { Nullable } from '@/shared/types/utilities'
import { EditorState } from 'draft-js'

export type CreatePlainTenderProcessForm = Omit<ITender, 'id' | 'workDescription' | 'startPeriod' | 'endPeriod'> & {
  startPeriod: Nullable<Date>
  endPeriod: Nullable<Date>
  workDescription: EditorState
}

// type TenderListQueryFiltersKeys = 'createdById' | 'onlyDrafts' | 'excludeDrafts' | 'limit' | 'offset'
export type TenderListQueryFilters = Record<string, string | number | boolean | undefined | null>
