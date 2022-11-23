export default class CommonConstants {
    //#region Routes
    static readonly Landing: string = "Landing";
    static readonly AddTransaction: string = "AddTransaction";

    //#endregion

    //#region Modules
    static readonly ModulesRoutes: { key?: string, value?: string, displayText?: string }[] = [
        { key: CommonConstants.Landing, value: 'Landing', displayText: 'Home' },
        { key: CommonConstants.AddTransaction, value: 'AddTransaction', displayText: 'Add transaction'  }
    ];

    //#endregion
}
