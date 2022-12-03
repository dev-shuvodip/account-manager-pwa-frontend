export default class CommonConstants {
    //#region Routes
    static readonly Authenticate: string = "Authenticate";
    static readonly Landing: string = "Landing";
    static readonly TransactionManagement: string = "TransactionManagement";
    static readonly Reports: string = "Reports";

    //#endregion

    //#region Modules
    static readonly ModulesRoutes: { key?: string, value?: string, displayText?: string }[] = [
        { key: CommonConstants.Landing, value: 'Landing', displayText: 'Home' },
        { key: CommonConstants.TransactionManagement, value: 'TransactionManagement', displayText: 'Manage Transactions' },
        { key: CommonConstants.Reports, value: "Reports", displayText: 'Generate Reports' }
    ];

    //#endregion

    //#region Messages
    static readonly Author = "Shuvodip Ray"
    static readonly CopyrightMessage = "All Rights Reserved"

    //#endregion

    //#region Firebase REST Api Endpoints
    static readonly signupNewUser = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
    static readonly verifyPassword = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
    static readonly setAccountInfo = "https://identitytoolkit.googleapis.com/v1/accounts:update";
    static readonly refreshToken = "https://securetoken.googleapis.com/v1/token";
    static readonly getOobConfirmationCode = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode";

    //#endregion
}
