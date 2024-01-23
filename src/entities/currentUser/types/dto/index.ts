import { UserType } from '..'

export interface ICreateUserDto {
  email: string
  password: string
  type: UserType
  isVerified?: boolean
  isActive?: boolean
}

export interface IOnboardingUserDto {
  firstName: string
  lastName: string
  phone: string
  // address: string
  // avatar: string
}

// TODO: update this interface Omit some props
export interface IUpdateUserDto extends Partial<IOnboardingUserDto>, Partial<ICreateUserDto> {}
