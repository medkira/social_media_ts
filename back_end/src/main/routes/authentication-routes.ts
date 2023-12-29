import { Router } from "express";
import { expressRouterAdapter } from "@main/adapters/express-router-adapter.js";
import { makeSignInController } from "@main/factories/controller/authentication/sign-in/controller-factory.js";
import { makeSignUpController } from "@main/factories/controller/authentication/sign-up/controller-factory.js";
import { makeTowFactorSignInController } from "@main/factories/controller/towFactorAuthentication/towFactorSignIn/controller-factory.js";
import { makeVerifyEmailController } from "@main/factories/controller/towFactorAuthentication/verifyEmail/controller-factory.js";
import { makeValidateTotpForVerifyEmailController } from "@main/factories/controller/towFactorAuthentication/validateTotpForVerifyEmail/controller-factory.js";
import { makeValidateTotpTowFactorSignInController } from "@main/factories/controller/towFactorAuthentication/validateTotpTowFactorSignIn/controller-factory.js";
import { makeEnableTowFactorAuthController } from "@main/factories/controller/towFactorAuthentication/enableTowFactorAuth/controller-factory.js";
import { authMiddleware } from "@main/middlewares/auth-middleware.js";



export default (router: Router): void => {
    router.post('/login', expressRouterAdapter(makeSignInController()));
    router.post('/register', expressRouterAdapter(makeSignUpController()));

    router.post('/login2Fa', expressRouterAdapter(makeTowFactorSignInController()));
    router.post('/verifyEmail', authMiddleware, expressRouterAdapter(makeVerifyEmailController()));

    router.patch('/enable2FA', authMiddleware, expressRouterAdapter(makeEnableTowFactorAuthController()));

    router.patch('/verifyTotp/verifyEmail', authMiddleware, expressRouterAdapter(makeValidateTotpForVerifyEmailController()));
    router.post('/verifyTotp/login2Fa', authMiddleware, expressRouterAdapter(makeValidateTotpTowFactorSignInController()));

}