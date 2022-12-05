export interface IGetUserResponse {
    users: IUsers[];
}

export interface IUsers {
    localId: string
    email: string
    displayName: string;
    passwordHash: string;
    providerUserInfo: IProviderUserInfo[];
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    emailVerified: boolean;
    passwordUpdatedAt: number;
    validSince: string;
    disabled: boolean;
    lastLoginAt: string;
    createdAt: string;
    customAuth: boolean;
}

export interface IProviderUserInfo {
    providerId: string;
    federatedId: string;
    displayName: string;
}