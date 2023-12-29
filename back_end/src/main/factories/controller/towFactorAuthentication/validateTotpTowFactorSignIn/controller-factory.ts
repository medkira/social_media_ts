import { BaseController } from "@infra/http/controllers/BaseController.js";
import { makeValidateTotpValidation } from "./validation-factory.js";
import { ValidateTotpTowFactorSignInController } from "@infra/http/controllers/towFactorAuthentication/validateTotpTowFactorSignInController.js";
import { makeValidateTotp } from "@main/factories/use-case/towFactorAuthentication/validate-totp-factory.js";
import { makeGenerateTokenAfterVlidateTotp } from "@main/factories/use-case/towFactorAuthentication/generate-token-after-vlidate-totp-factory.js";

export const makeValidateTotpTowFactorSignInController = (): BaseController => {
    const ValidateTotpValidation = makeValidateTotpValidation();
    const ValidateTotpUseCase = makeValidateTotp();
    const generateTokenAfterVlidateTotpUseCase = makeGenerateTokenAfterVlidateTotp()

    return new ValidateTotpTowFactorSignInController(
        ValidateTotpValidation,
        ValidateTotpUseCase,
        generateTokenAfterVlidateTotpUseCase);
}