import authenticationRoutes from "@main/routes/authentication-routes.js";
import postRoutes from '@main/routes/post-routes.js'
import commentRoutes from '@main/routes/comment-routes.js'
import { Express, Router } from "express"


export const setupRoutes = (app: Express): void => {
    const router = Router();
    app.use('/api', router);
    authenticationRoutes(router);
    postRoutes(router);
    commentRoutes(router);
}