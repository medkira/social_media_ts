import { CheckTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckTowFactorAuthInterface.js";
import { CheckTowFactorAuth } from "@application/use-cases/TowFactorAuthentication/CheckTowFactoryAuth.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeCheckTowFactorAuth = (): CheckTowFactorAuthInterface => {
    const userRepository = new UserRepository();

    return new CheckTowFactorAuth(userRepository)
}