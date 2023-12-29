import { BaseController } from "@infra/http/controllers/BaseController.js";
import { VerifyEmailController } from "@infra/http/controllers/towFactorAuthentication/verifyEmailController.js";
import { makeSignIn } from "@main/factories/use-case/authentication/sign-in-factory.js";
import { makeCheckEmailVerified } from "@main/factories/use-case/towFactorAuthentication/check-email-verified-factory.js";
import { makeCreateTOTP } from "@main/factories/use-case/towFactorAuthentication/create-TOTP-factory.js";
import { makeSendTotpToEmail } from "@main/factories/use-case/towFactorAuthentication/send-TOTO-to-email-factory.js";
import { makeVerifyEmailValidation } from "./validation-factory.js";
import { makecreateTOTPSecret } from "@main/factories/use-case/towFactorAuthentication/create-TOTP-secret-factory.js";

export const makeVerifyEmailController = (): BaseController => {
    const signInUseCase = makeSignIn();
    const createTotpUseCase = makeCreateTOTP();
    const checkEmailverifiedUseCase = makeCheckEmailVerified();
    const sendTotpToEmailUseCase = makeSendTotpToEmail();
    const verifyEmailValidation = makeVerifyEmailValidation();
    const createTOTPSecretUseCase = makecreateTOTPSecret()


    return new VerifyEmailController(
        signInUseCase,
        createTotpUseCase,
        checkEmailverifiedUseCase,
        sendTotpToEmailUseCase,
        verifyEmailValidation,
        createTOTPSecretUseCase);
}