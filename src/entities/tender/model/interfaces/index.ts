import { RawDraftContentState } from 'draft-js'
import { TenderPublishment } from '../constants'
import { Nullable } from '@/shared/types/utilities'

export interface ITender {
  id: string
  title: string
  shortDescription: string
  startPeriod: Nullable<string> // timestamp
  endPeriod: Nullable<string> // timestamp
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
  status: string
  uploadedFiles?: File[]
  invitedTeamMembers?: string[] // EXCLUDE FROM MVP
  fields?: Record<string, string> // EXCLUDE FROM MVP
}
