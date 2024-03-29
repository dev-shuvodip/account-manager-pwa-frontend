export interface IEmailUpdateResponse {
    localId: string;
    email: string;
    passwordHash: string;
    providerUserInfo: IProviderUserInfo[]
    idToken: string;
    refreshToken: string;
    expiresIn: string;
}

export interface IProviderUserInfo {
    providerId: string;
    federatedId: string;
    displayName: string;
}