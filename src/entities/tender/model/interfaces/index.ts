import { RawDraftContentState } from 'draft-js'
import { TenderPublishment } from '../constants'
import { Nullable } from '@/shared/types/utilities'

export interface ITender {
  id: string

  title: string
  shortDescription: string

  startPeriod: Nullable<string> // timestamp
  endPeriod: Nullable<string> // timestamp

  addressStreet: string
  addressHouseNumber: string
  addressSuffix: string
  addressPostalCode: string
  addressCity: string
  addressCountry: string

  workDescription: RawDraftContentState

  paymentTerm: string // number
  publishment: TenderPublishment[]

  invitedSuppliers: string[]
  
  uploadedFiles?: File[]
  
  status: string

  invitedTeamMembers?: string[] // EXCLUDE FROM MVP
  fields?: Record<string, string> // EXCLUDE FROM MVP
}
