import { UpdateUserEmailVerifyRepository } from "@application/interfaces/repositories/towFactoryAuthentication/updateUserEmailVerifyReposirtory.js";
import { UpdateUserEmailVerifyInterface } from "@application/interfaces/use-cases/towFactorAuthentication/UpdateUserEmailVerifyInterface.js";

export class UpdateUserEmailVerify implements UpdateUserEmailVerifyInterface {
    constructor(
        private readonly updateUserEmailVerify: UpdateUserEmailVerifyRepository,
    ) { }

    async execute(userId: string): Promise<void> {
        this.updateUserEmailVerify.updateUserEmailVerify(userId);
    }

}