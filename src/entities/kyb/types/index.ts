import { IKybUserDto } from '../../currentUser/types/dto'

export interface IKybData extends Pick<IKybUserDto, 'firstName' | 'lastName' | 'phone'> {}

export interface IKybCompanyData {
  name: string
  website: string
  email: string
  phone: string
  address?: string
}
