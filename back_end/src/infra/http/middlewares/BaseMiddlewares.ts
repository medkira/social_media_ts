import { serverError } from "../helper/https.js";
import { HttpRequest } from "../interfaces/HttpRequest.js";
import { HttpResponse } from "../interfaces/HttpResponse.js";

export abstract class BaseMiddleware {
    abstract execute(htttpRequest: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            return await this.execute(httpRequest);
        } catch (error) {
            return serverError(error);
        }
    }
}