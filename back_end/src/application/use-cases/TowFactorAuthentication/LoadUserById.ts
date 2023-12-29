import { UserNotFoundError } from "@application/errors/UserNotFoundError.js";
import { LoadUserByIdRepository } from "@application/interfaces/repositories/towFactoryAuthentication/LoadUserByIdRepository.js";
import { LoadUserByIdInterface } from "@application/interfaces/use-cases/towFactorAuthentication/LoadUserByIdInterface.js";

export class LoadUserById implements LoadUserByIdInterface {
    constructor(
        private readonly loadUserByIdRepositort: LoadUserByIdRepository,
    ) { }

    async execute(userId: string): Promise<LoadUserByIdInterface.Response> {
        const user = await this.loadUserByIdRepositort.LoadUserById(userId);
        if (!user) {
            return new UserNotFoundError()
        }
        return user;
    }

}