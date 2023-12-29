import { ValidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/ValidateTotpInterface.js";
import { ValidateTotp } from "@application/use-cases/TowFactorAuthentication/ValidateTotp.js";
import { BcryptAdapter } from "@infra/cryptography/BcryptAdaptor.js";
import { UserTotpRepository } from "@infra/db/mongodb/repositories/userTotpRepository.js";
import env from "@main/config/env.js";

export const makeValidateTotp = (): ValidateTotpInterface => {
    const userRepository = new UserTotpRepository();
    const bcryptAdapter = new BcryptAdapter(Number(env.bcryptSalt));
    return new ValidateTotp(userRepository, bcryptAdapter)
}