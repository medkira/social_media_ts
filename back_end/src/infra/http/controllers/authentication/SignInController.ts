import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";
import { BaseController } from "../BaseController.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { ok, unauthorized } from "@infra/http/helper/https.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";


export class SignInController extends BaseController {
    constructor(
        private readonly signInValidation: Validation,
        private readonly signIn: SignInInterface,
    ) {
        super(signInValidation);
    }

    async execute(httpRequest: SignInController.Request): Promise<SignInController.Response> {
        const { email, password } = httpRequest.body!;
        const authenticationTokenOrError = await this.signIn.execute({ email, password });

        if (authenticationTokenOrError instanceof UnauthorizedError) {
            return unauthorized(authenticationTokenOrError)
        }
        return ok({
            authenticationToken: authenticationTokenOrError,
        });
    }
}

export namespace SignInController {
    export type Request = HttpRequest<SignInInterface.Request>
    export type Response = HttpResponse<{ authenticationToken: string } | UnauthorizedError>
}