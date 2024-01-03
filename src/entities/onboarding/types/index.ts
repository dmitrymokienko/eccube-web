import { IOnboardingUserDto } from '@/entities/currentUser/types/dto'

export interface IOnboardingUserData
  extends Pick<IOnboardingUserDto, 'firstName' | 'lastName' | 'phoneNumber'> {}

export interface IOnboardingCompanyData extends Pick<IOnboardingUserDto, 'company' | 'address'> {}
