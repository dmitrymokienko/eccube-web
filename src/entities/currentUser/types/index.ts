export enum UserType {
    Supplier = "Supplier",
    Customer = "Customer",
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    //   avatar: string
    address: string;
    company: string;
    createdAt: string;
    updatedAt: string;
    phoneNumber: string;
    type: UserType;
    isActive: boolean;
    isVerified: boolean;
    isOnboardingPassed: boolean;
}

export interface ILoginUserResponse {
    user: IUser;
    backendTokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
}
