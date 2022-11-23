export default class CommonConstants {
    //#region Routes
    static readonly Landing: string = "Landing";
    static readonly TransactionManagement: string = "TransactionManagement";

    //#endregion

    //#region Modules
    static readonly ModulesRoutes: { key?: string, value?: string, displayText?: string }[] = [
        { key: CommonConstants.Landing, value: 'Landing', displayText: 'Home' },
        { key: CommonConstants.TransactionManagement, value: 'TransactionManagement', displayText: 'Manage Transactions'  }
    ];

    //#endregion
}
