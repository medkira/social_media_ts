import { AuthenticateInterface } from "@application/interfaces/use-cases/authentication/AuthenticateInterface.js";
import { Authenticate } from "@application/use-cases/authentication/Authenticate.js";
import { JWTAdapter } from "@infra/cryptography/JWTAdapter.js";
import env from "@main/config/env.js";

export const makeAuthenticate = (): AuthenticateInterface => {
    const jwtAdapter = new JWTAdapter(String(env.jwtSecret))
    return new Authenticate(jwtAdapter);
}