import { Request, Response } from "express"
import { BaseController } from "@infra/http/controllers/BaseController.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";

export const expressRouterAdapter = (
    controller: BaseController,
) => async (req: Request, res: Response) => {

    const htttpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };



    const httpResponse = await controller.handle(htttpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message,
        });
    }
}