export class UserTotpNotFound extends Error {
    constructor() {
        super('The UserTotp was not found');
        this.name = 'UserTotpNotFoundError'
    }
}