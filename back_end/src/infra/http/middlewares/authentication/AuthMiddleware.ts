import { AuthenticateInterface } from "@application/interfaces/use-cases/authentication/AuthenticateInterface.js";
import { BaseMiddleware } from "../BaseMiddlewares.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { AuthTokenNotProvidedError } from "@infra/http/errors/AuthTokenNotProvidedError.js";
import { InvalidAuthTokenError } from "@infra/http/errors/InvalidAuthTokenError.js";
import { forbidden, ok } from "@infra/http/helper/https.js";
import { ForbiddenError } from "@application/errors/ForbiddenError.js";

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

        const userIdOrError = await this.authenticate.execute(authToken);
        if (userIdOrError instanceof ForbiddenError) {
            return forbidden(new InvalidAuthTokenError());
        }

        return ok({ userId: userIdOrError });
    }
}

export namespace AuthMiddleware {
    export type Request = HttpRequest<undefined, undefined, { authorization: string }>
    export type Response = HttpResponse<{ UserId: string } | AuthTokenNotProvidedError | InvalidAuthTokenError>
}