import { EnableTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/EnableTowFactorAuthInterface.js";
import { EnableTowFactorAuth } from "@application/use-cases/TowFactorAuthentication/EnableTowFactorAuth.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeEnabelTowFactorAuth = (): EnableTowFactorAuthInterface => {
    const userRepostiory = new UserRepository();
    return new EnableTowFactorAuth(userRepostiory);
}

