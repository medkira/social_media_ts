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
    // console.log(httpRequest);
    // console.log("----------------------------------------------------");

    const httpResponse = await middleware.handle(httpRequest);
    // console.log("auth middlle ware response", httpResponse);
    // console.log("----------------------------------------------------");

    if (httpResponse.statusCode === 200) {
        // console.log("data from express middlwe adapter", httpResponse.body);
        // console.log("----------------------------------------------------");
        Object.assign(req, httpResponse.body);
        next();
    } else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message,
        })
    }

}