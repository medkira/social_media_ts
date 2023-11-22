import { expressRouterAdapter } from "@main/adapters/express-router-adapter.js";
import { makeCreateCommentController } from "@main/factories/controller/comments/create-comment/controller-factory.js";
import { authMiddleware } from "@main/middlewares/auth-middleware.js";
import { Router } from "express";


export default (router: Router): void => {
    router.post('/comments', authMiddleware, expressRouterAdapter(makeCreateCommentController()))
}