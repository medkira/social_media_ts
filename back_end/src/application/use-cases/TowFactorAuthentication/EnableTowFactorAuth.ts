import { EnableTowFactorAuthRepository } from "@application/interfaces/repositories/towFactoryAuthentication/EnableTowFactorRepository.js";
import { EnableTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/EnableTowFactorAuthInterface.js";

export class EnableTowFactorAuth implements EnableTowFactorAuthInterface {
    constructor(
        private readonly enableTowFactorAuthRepository: EnableTowFactorAuthRepository,
    ) { }

    async execute(userId: string): Promise<void> {
        await this.enableTowFactorAuthRepository.EnableTowFactorAuth(userId);
    }
}