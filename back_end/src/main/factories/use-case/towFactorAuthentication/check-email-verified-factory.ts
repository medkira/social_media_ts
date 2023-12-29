import { CheckEmailVerifiedInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckEmailVerifiedInterface.js";
import { CheckEmailVerified } from "@application/use-cases/TowFactorAuthentication/CheckEmailVerified.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeCheckEmailVerified = (): CheckEmailVerifiedInterface => {
    const userRepository = new UserRepository();
    return new CheckEmailVerified(userRepository)
}