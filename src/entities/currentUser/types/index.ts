export enum UserType {
  Supplier = 'Supplier',
  Customer = 'Customer',
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  //   avatar: string
  type: UserType
  isActive: boolean
  isVerified: boolean
}

export interface ILoginUserResponse {
  user: IUser
  backendTokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}
