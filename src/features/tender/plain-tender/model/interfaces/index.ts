import { ITender } from '@/entities/tender/model/interfaces'
import { EditorState } from 'draft-js'

export type CreatePlainTenderProcessForm = Omit<ITender, 'id' | 'workDescription'> & {
  workDescription: EditorState
}

// type TenderListQueryFiltersKeys = 'createdById' | 'onlyDrafts' | 'excludeDrafts' | 'limit' | 'offset'
export type TenderListQueryFilters = Record<string, string | number | boolean | undefined | null>
