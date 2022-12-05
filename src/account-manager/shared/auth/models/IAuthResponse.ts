export interface IAuthResponse {
    idToken: string;
    email: string;
    displayName: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}