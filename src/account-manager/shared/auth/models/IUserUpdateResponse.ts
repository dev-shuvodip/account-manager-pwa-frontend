export interface IUserUpdateResponse {
    localId: string;
    email: string;
    displayName: string;
    passwordHash: string;
    providerUserInfo: IProviderUserInfo[]
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    emailVerified: boolean;
}

export interface IProviderUserInfo {
    providerId: string;
    federatedId: string;
    displayName: string;
}