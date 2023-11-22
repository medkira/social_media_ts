import { SignUpInterface } from "@application/interfaces/use-cases/authentication/SignUpInterface.js";
import { SignUp } from "@application/use-cases/authentication/SignUp.js";
import { BcryptAdapter } from "@infra/cryptography/BcryptAdaptor.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";
import env from "@main/config/env.js";

export const makeSignUp = (): SignUpInterface => {
    const userRepository = new UserRepository();
    const bcryptAdapter = new BcryptAdapter(Number(env.bcryptSalt));


    return new SignUp(userRepository, userRepository, bcryptAdapter);
}