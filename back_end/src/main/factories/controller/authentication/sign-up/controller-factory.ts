import { BaseController } from "@infra/http/controllers/BaseController.js";
import { SignUpController } from "@infra/http/controllers/authentication/SignUpController.js";
import { makeSignIn } from "@main/factories/use-case/authentication/sign-in-factory.js";
import { makeSignUp } from "@main/factories/use-case/authentication/sign-up-factory.js";
import { makeSignUpValidation } from "./validation-factory.js";

export const makeSignUpController = (): BaseController => {
    const validation = makeSignUpValidation();
    const signUp = makeSignUp();
    const signIn = makeSignIn();

    return new SignUpController(validation, signUp, signIn);
}