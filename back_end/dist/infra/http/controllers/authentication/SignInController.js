import { BaseController } from "../BaseController.js";
import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { ok, unauthorized } from "@infra/http/helper/https.js";
export class SignInController extends BaseController {
    signInValidation;
    signIn;
    constructor(signInValidation, signIn) {
        super(signInValidation);
        this.signInValidation = signInValidation;
        this.signIn = signIn;
    }
    async execute(httpRequest) {
        const { email, password } = httpRequest.body;
        const authenticationTokenOrError = await this.signIn.execute({ email, password });
        if (authenticationTokenOrError instanceof UnauthorizedError) {
            return unauthorized(authenticationTokenOrError);
        }
        return ok({
            authenticationToken: authenticationTokenOrError,
        });
    }
}
//# sourceMappingURL=SignInController.js.map