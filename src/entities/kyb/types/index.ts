import { IKybUserDto } from '../../currentUser/types/dto'

export interface IKybData extends Pick<IKybUserDto, 'firstName' | 'lastName' | 'phone'> {}

export interface IKybCompanyData {
  name: string
  address: {
    streetAndNumber: string
    postalCode: string
    city: string
    country: string
  }
  registrationNumber: string
  vatNumber: string
  website: string
  email: string
  phone: string
  businessCategory: string
}
