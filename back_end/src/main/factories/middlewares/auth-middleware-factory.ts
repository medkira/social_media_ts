import { BaseMiddleware } from "@infra/http/middlewares/BaseMiddlewares.js";
import { AuthMiddleware } from "@infra/http/middlewares/authentication/AuthMiddleware.js";
import { makeAuthenticate } from "../use-case/authentication/authenticate-factory.js";

export const makeAuthMiddleware = (): BaseMiddleware => {
    const authenticateUseCase = makeAuthenticate();
    return new AuthMiddleware(authenticateUseCase)
}