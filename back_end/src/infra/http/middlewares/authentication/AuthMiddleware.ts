import { AuthenticateInterface } from "@application/interfaces/use-cases/authentication/AuthenticateInterface.js";
import { BaseMiddleware } from "../BaseMiddlewares.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { AuthTokenNotProvidedError } from "@infra/http/errors/AuthTokenNotProvidedError.js";
import { InvalidAuthTokenError } from "@infra/http/errors/InvalidAuthTokenError.js";
import { forbidden, ok } from "@infra/http/helper/https.js";
import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { DecodedToken } from "@domain/entities/TokenPayload.js";

export class AuthMiddleware extends BaseMiddleware {
    constructor(
        private readonly authenticate: AuthenticateInterface,
    ) {
        super()
    }

    async execute(htttpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
        const authToken = htttpRequest.headers?.authorization;
        if (!authToken) {
            return forbidden(new InvalidAuthTokenError());
        }

        const decodedTokenOrError = await this.authenticate.execute(authToken);
        if (decodedTokenOrError instanceof ForbiddenError) {
            return forbidden(new InvalidAuthTokenError());
        }
        // console.log(ok(decodedTokenOrError))
        return ok(decodedTokenOrError);
    }
}

export namespace AuthMiddleware {
    export type Request = HttpRequest<undefined, undefined, { authorization: string }>
    export type Response = HttpResponse<DecodedToken | AuthTokenNotProvidedError | InvalidAuthTokenError>
}