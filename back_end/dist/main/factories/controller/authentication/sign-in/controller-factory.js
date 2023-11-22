import { SignInController } from "@infra/http/controllers/authentication/SignInController.js";
import { makeSignInValidation } from "./validation-factory.js";
import { makeSignIn } from "@main/factories/use-case/authentication/sign-in-factory.js";
export const makeSignInController = () => {
    const validation = makeSignInValidation();
    const useCase = makeSignIn();
    return new SignInController(validation, useCase);
};
//# sourceMappingURL=controller-factory.js.map