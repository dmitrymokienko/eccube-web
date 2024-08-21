import { ITender } from '@/entities/tender/model/interfaces'
import { EditorState } from 'draft-js'

export type CreatePlainTenderProcessForm = Omit<ITender, 'id' | 'workDescription'> & {
  workDescription: EditorState
}
