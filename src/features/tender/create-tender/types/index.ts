import { EditorState } from 'draft-js'

export type CreatePlainTenderProcessForm = {
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
  customFields: Record<string, string>
  description: EditorState // string
  paymentTerm: string
  attachments?: File[]
  publishment: boolean
  invitedSuppliers: string[]
  invitedTeamMembers: string[]
}

// stub
export type CreateTenderDto = CreatePlainTenderProcessForm

// stub
export type TenderDto = CreatePlainTenderProcessForm & { id: string }
