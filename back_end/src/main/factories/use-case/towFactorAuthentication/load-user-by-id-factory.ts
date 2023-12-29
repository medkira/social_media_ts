import { LoadUserByIdInterface } from "@application/interfaces/use-cases/towFactorAuthentication/LoadUserByIdInterface.js";
import { LoadUserById } from "@application/use-cases/TowFactorAuthentication/LoadUserById.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeLoadUserById = (): LoadUserByIdInterface => {
    const userRepository = new UserRepository();

    return new LoadUserById(userRepository)
}