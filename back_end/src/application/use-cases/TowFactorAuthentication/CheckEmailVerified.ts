import { EmailNotVerifiedError } from "@application/errors/EmailNotVerifiedError.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import { CheckEmailVerifiedInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckEmailVerifiedInterface.js";

export class CheckEmailVerified implements CheckEmailVerifiedInterface {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    ) { }

    async execute(email: string): Promise<CheckEmailVerifiedInterface.Response> {
        const existingUser = await this.loadUserByEmailRepository.loadUserByEmail(email);


        if (existingUser) {
            if (existingUser.isEmailVerified) {

                return existingUser.isEmailVerified
            }
            console.log(existingUser.isEmailVerified)
            return new EmailNotVerifiedError
        }
        // ! i need to chnage to user not found in case the email does not exist in the database
        return false;
    }

}