import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";
import { SignIn } from "@application/use-cases/authentication/SignIn.js";
import { JWTAdapter } from "@infra/cryptography/JWTAdapter.js";
import { BcryptAdapter } from "@infra/cryptography/BcryptAdaptor.js";
import env from "@main/config/env.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";

export const makeSignIn = (): SignInInterface => {
    const userRepository = new UserRepository();
    const bcrytAdapter = new BcryptAdapter(Number(env.bcryptSalt));
    const jwtAdapter = new JWTAdapter(String(env.jwtSecret));

    return new SignIn(userRepository, bcrytAdapter, jwtAdapter);
}