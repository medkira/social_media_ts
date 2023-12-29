import { BaseController } from "@infra/http/controllers/BaseController.js";
import { makeValidateTotpValidation } from "../validateTotpTowFactorSignIn/validation-factory.js";
import { ValidateTotpForVerifyEmailController } from "@infra/http/controllers/towFactorAuthentication/validateTotpTowForVerifyEmailController.js";
import { makeValidateTotp } from "@main/factories/use-case/towFactorAuthentication/validate-totp-factory.js";
import { makeUpdateUserEmailVerify } from "@main/factories/use-case/towFactorAuthentication/update-user-email-verify-factory.js";

export const makeValidateTotpForVerifyEmailController = (): BaseController => {
    const ValidateTotpValidation = makeValidateTotpValidation();
    const ValidateTotpUseCase = makeValidateTotp();
    const UpdateUserEmailVerify = makeUpdateUserEmailVerify();
    return new ValidateTotpForVerifyEmailController(
        ValidateTotpValidation,
        ValidateTotpUseCase,
        UpdateUserEmailVerify);
}