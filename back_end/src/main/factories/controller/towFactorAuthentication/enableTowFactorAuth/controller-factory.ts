import { BaseController } from "@infra/http/controllers/BaseController.js";
import { EnableTowFactorAuthController } from "@infra/http/controllers/towFactorAuthentication/EnableTowFactorAuthController.js";
import { makeCheckEmailVerified } from "@main/factories/use-case/towFactorAuthentication/check-email-verified-factory.js";
import { makeEnabelTowFactorAuth } from "@main/factories/use-case/towFactorAuthentication/enable-tow-factor-aruth-factory.js";
import { makeLoadUserById } from "@main/factories/use-case/towFactorAuthentication/load-user-by-id-factory.js";

export const makeEnableTowFactorAuthController = (): BaseController => {
    const enableTowFactorAuthUseCase = makeEnabelTowFactorAuth();
    const checkEmailVerifiedUseCase = makeCheckEmailVerified();
    const loadUserByIdUseCase = makeLoadUserById();
    return new EnableTowFactorAuthController(
        enableTowFactorAuthUseCase,
        checkEmailVerifiedUseCase,
        loadUserByIdUseCase);
}