import { BaseController } from "@infra/http/controllers/BaseController.js";
import { towFactorySignInController } from "@infra/http/controllers/towFactorAuthentication/towFactorSignInController.js";
import { makeSignIn } from "@main/factories/use-case/authentication/sign-in-factory.js";
import { makeCheckEmailVerified } from "@main/factories/use-case/towFactorAuthentication/check-email-verified-factory.js";
import { makeCheckTowFactorAuth } from "@main/factories/use-case/towFactorAuthentication/check-tow-factor-Auth-facotry.js";
import { makeCreateTOTP } from "@main/factories/use-case/towFactorAuthentication/create-TOTP-factory.js";
import { makecreateTOTPSecret } from "@main/factories/use-case/towFactorAuthentication/create-TOTP-secret-factory.js";
import { makeGenerateTokenAfterVlidateTotp } from "@main/factories/use-case/towFactorAuthentication/generate-token-after-vlidate-totp-factory.js";
import { makeSendTotpToEmail } from "@main/factories/use-case/towFactorAuthentication/send-TOTO-to-email-factory.js";

export const makeTowFactorSignInController = (): BaseController => {
    const signInUseCase = makeSignIn();
    const createTOTPSecretUseCase = makecreateTOTPSecret()
    const createTotpUseCase = makeCreateTOTP();
    const checkTowFactorAuthUseCase = makeCheckTowFactorAuth();
    const checkEmailverifiedUseCase = makeCheckEmailVerified();
    const sendTotpToEmailUseCase = makeSendTotpToEmail();
    // ! need to fix when we pass wrong usecase 
    // ! hint: the interface of createsecrete and create totp are the same 
    // ! i think thats why typescript accepting bouth
    return new towFactorySignInController(
        signInUseCase,
        createTotpUseCase,
        createTOTPSecretUseCase,
        checkTowFactorAuthUseCase,
        checkEmailverifiedUseCase,
        sendTotpToEmailUseCase,
    );
}