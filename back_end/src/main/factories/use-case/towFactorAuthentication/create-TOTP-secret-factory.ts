import { CreateTOTPSecretInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPSecretInterface.js";
import { CreateTotpSecret } from "@application/use-cases/TowFactorAuthentication/CreateTotpSecret.js";
import { JWTAdapter } from "@infra/cryptography/JWTAdapter.js";
import env from "@main/config/env.js"; // GOOD job :)

export const makecreateTOTPSecret = (): CreateTOTPSecretInterface => {
    const jwtAdapter = new JWTAdapter(String(env.jwtSecret));
    return new CreateTotpSecret(jwtAdapter);
}