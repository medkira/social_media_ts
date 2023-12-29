import { expressMiddlewareAdaptor } from "@main/adapters/express-middleware-adapter.js";
import { makeAuthMiddleware } from "@main/factories/middlewares/auth-middleware-factory.js";

export const authMiddleware = expressMiddlewareAdaptor(makeAuthMiddleware());
