import { Router } from "express"
import { expressRouterAdapter } from "@main/adapters/express-router-adapter.js"
import { authMiddleware } from '@main/middlewares/auth-middleware.js'
import { makeCreatePostController } from "@main/factories/controller/posts/create-post/controller-factory.js"
import { makeGetPostByIdController } from "@main/factories/controller/posts/get-post-by-id/controller-factory.js"
import { makeUpdatePostController } from "@main/factories/controller/posts/update-post/controller-factory.js"
import { makeDeletePostController } from "@main/factories/controller/posts/delete-post/controller-factory.js"
export default (router: Router): void => {
    router.post('/posts', authMiddleware, expressRouterAdapter(makeCreatePostController()));
    router.get('/posts/:id', expressRouterAdapter(makeGetPostByIdController()));
    router.patch('/posts/:id', authMiddleware, expressRouterAdapter(makeUpdatePostController()));
    router.delete('/posts/:id', authMiddleware, expressRouterAdapter(makeDeletePostController()));
}