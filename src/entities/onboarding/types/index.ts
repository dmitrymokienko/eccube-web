import { IOnboardingUserDto } from '../../currentUser/types/dto'

export interface IOnboardingUserData
  extends Pick<IOnboardingUserDto, 'firstName' | 'lastName' | 'phone'> {}

export interface IOnboardingCompanyData {
  name: string
  website: string
  email: string
  phone: string
  address?: string
}
