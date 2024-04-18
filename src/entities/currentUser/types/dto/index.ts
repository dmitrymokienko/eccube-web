import { Role } from '..'

export interface ICreateUserDto {
  email: string
  password: string
  roles: Role[]
  isVerified?: boolean
  isActive?: boolean
}

export interface IKybUserDto {
  firstName: string
  lastName: string
  phone: string
  // address: string
  // avatar: string
}

// TODO: update this interface Omit some props
export interface IUpdateUserDto extends Partial<IKybUserDto>, Partial<ICreateUserDto> {}
