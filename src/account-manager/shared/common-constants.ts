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
}
