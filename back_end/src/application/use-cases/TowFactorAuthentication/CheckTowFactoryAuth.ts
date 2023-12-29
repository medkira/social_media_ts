import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import { CheckTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckTowFactorAuthInterface.js";

export class CheckTowFactorAuth implements CheckTowFactorAuthInterface {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    ) { }

    async execute(email: string): Promise<Boolean> {
        const existingUser = await this.loadUserByEmailRepository.loadUserByEmail(email);
        if (existingUser) {
            if (existingUser.isTwoFactorAuthEnabled) {
                return existingUser.isTwoFactorAuthEnabled
            }
            return existingUser.isTwoFactorAuthEnabled
        }
        // ! i need to chnage to user not found in case the email does not exist in the database
        return false;
    }

}