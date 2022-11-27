export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _refreshToken: string,
        private _tokenExpirationdate: Date,
        public name?: string
    ) { }

    get token() {
        if (!this._tokenExpirationdate || new Date() > this._tokenExpirationdate) {
            return null;
        }
        return this._token;
    }

    get refreshToken() {
        return this._refreshToken;
    }
}