import { UpdateUserEmailVerifyInterface } from "@application/interfaces/use-cases/towFactorAuthentication/UpdateUserEmailVerifyInterface.js";
import { UpdateUserEmailVerify } from "@application/use-cases/TowFactorAuthentication/UpdateUserEmailVerify.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeUpdateUserEmailVerify = (): UpdateUserEmailVerifyInterface => {
    const userRepository = new UserRepository();
    return new UpdateUserEmailVerify(userRepository);
}