import { GenerateTokenAfterVlidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/GenrateTokenAfterValidateTotpInterface.js";
import { GenerateTokenAfterVlidateTotp } from "@application/use-cases/TowFactorAuthentication/GenerateTokenAfterVlidateTotp.js";
import { JWTAdapter } from "@infra/cryptography/JWTAdapter.js";
import env from "@main/config/env.js";

export const makeGenerateTokenAfterVlidateTotp = (): GenerateTokenAfterVlidateTotpInterface => {
    const jwtAdapter = new JWTAdapter(String(env.jwtSecret));

    return new GenerateTokenAfterVlidateTotp(jwtAdapter);
}