import { RawDraftContentState } from 'draft-js'
import { TenderPublishment } from '../constants'
import { Nullable } from '@/shared/types/utilities'
import { Currency, PricePer, PriceType } from '@/entities/currencies/constants'
import { IUploadedFile } from '@/entities/uploadFiles/model/interfaces'

export interface ITender {
  id: string

  title: string
  shortDescription: string

  jobType: 'oneTime' | 'cyclic'
  jobStartDate: Nullable<string> // timestamp
  jobEndDate: Nullable<string> // timestamp
  jobCycleFrequency: Nullable<string> // number
  jobStartPeriod: Nullable<string> // timestamp
  jobEndPeriod: Nullable<string> // timestamp
  jobDays: string[]
  jobDayOfMonth: Nullable<number[]>
  jobQuarterMonth: Nullable<string>
  jobDayOfQuarter: Nullable<number[]>

  startPeriod: Nullable<string> // timestamp
  endPeriod: Nullable<string> // timestamp

  currency: Currency
  amount: number
  pricePer: PricePer
  priceType: PriceType

  address: {
    street: string
    houseNumber: string
    suffix: string
    postalCode: string
    city: string
    country: string
  }

  workDescription: RawDraftContentState

  paymentTerm: string // number
  publishment: TenderPublishment[]

  invitedSuppliers: string[]

  uploadedFiles?: IUploadedFile[]

  status: string

  invitedTeamMembers?: string[] // EXCLUDE FROM MVP
  fields?: Record<string, string> // EXCLUDE FROM MVP
}
