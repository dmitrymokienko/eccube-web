import { EditorState } from 'draft-js'
import { prepareCreateTenderDtoMapper } from '../utils/mappers'

export type CreatePlainTenderProcessForm = {
  isDraft: boolean
  title: string
  shortDescription: string
  startDate: string
  endDate: string
  street: string
  houseNumber: string
  addressSuffix: string
  postalCode: string
  city: string
  country: string
  workDescription: EditorState // string
  paymentTerm: string // number
  publishment: TenderPublishment[]
  invitedSuppliers: string[]
  uploadedFiles?: File[]
  invitedTeamMembers?: string[] // EXCLUDE FROM MVP
  fields?: Record<string, string> // EXCLUDE FROM MVP
}

export type CreateTenderDto = ReturnType<typeof prepareCreateTenderDtoMapper>

// stub
export type TenderDto = CreatePlainTenderProcessForm & { id: string }

export enum TenderPublishment {
  ECCUBE = 'eccube',
  TEAM = 'team',
  INVITATION = 'invitation',
}
