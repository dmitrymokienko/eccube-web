import { RawDraftContentState } from 'draft-js'

export interface ITender {
  id: string
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
  workDescription: RawDraftContentState
  paymentTerm: string // number
  publishment: TenderPublishment[]
  invitedSuppliers: string[]
  isDraft: boolean
  uploadedFiles?: File[]
  invitedTeamMembers?: string[] // EXCLUDE FROM MVP
  fields?: Record<string, string> // EXCLUDE FROM MVP
}

export enum TenderPublishment {
  ECCUBE = 'eccube',
  TEAM = 'team',
  INVITATION = 'invitation',
}
