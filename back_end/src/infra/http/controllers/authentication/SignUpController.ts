import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";
import { SignUpInterface } from "@application/interfaces/use-cases/authentication/SignUpInterface.js";
import { EmailInUseError } from "@application/errors/EmailInUseError.js";
import { forbidden, ok } from "@infra/http/helper/https.js";

export class SignUpController extends BaseController {
    constructor(
        private readonly signUpValidation: Validation,
        private readonly signUp: SignUpInterface,
        private readonly signIn: SignInInterface,
    ) {
        super(signUpValidation);
    }
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {

        const { name, username, email, password } = httpRequest.body;
        const idOrError = await this.signUp.execute({
            name, username, email, password
        });

        if (idOrError instanceof EmailInUseError) {
            return forbidden(idOrError)
        }


        const authenticationTokenOrError = await this.signIn.execute({ email, password });
        if (authenticationTokenOrError instanceof Error) {
            throw authenticationTokenOrError
        }

        return ok({
            authenticationToken: authenticationTokenOrError,
        })
    }
}


export namespace SignUpController {
    export type Request = HttpRequest<SignInInterface.Request>
    export type Response = HttpResponse<{ authenticationToken: string } | EmailInUseError>
}