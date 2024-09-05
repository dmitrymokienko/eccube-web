export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  address: string
  company: string
  createdAt: string
  updatedAt: string
  phone: string
  isActive: boolean
  isVerified: boolean
  isKybPassed: boolean
}

export interface ILoginUserResponse {
  user: IUser
  backendTokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export enum ProfileType {
  SUPPLIER = 'supplier',
  CUSTOMER = 'customer',
}
