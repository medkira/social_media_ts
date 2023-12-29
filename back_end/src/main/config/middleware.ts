import { bodyparser } from "@main/middlewares/body-parser.js"
import { Express } from "express"

export const setupMiddleware = (app: Express): void => {
    app.use(bodyparser)
}