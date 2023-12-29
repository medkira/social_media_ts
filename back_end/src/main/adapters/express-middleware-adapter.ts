import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { BaseMiddleware } from "@infra/http/middlewares/BaseMiddlewares.js";
import { Request, Response, NextFunction } from "express";
export const expressMiddlewareAdaptor = (
    middleware: BaseMiddleware,
) => async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body);
        next();
    } else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message,
        })
    }

}