import { badRequest, serverError } from "../helper/https.js";
import { HttpRequest } from "../interfaces/HttpRequest.js";
import { HttpResponse } from "../interfaces/HttpResponse.js";
import { Validation } from "../interfaces/Validation.js";


export abstract class BaseController {
    constructor(private readonly validation?: Validation) { }

    abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest);
            if (error) {
                return badRequest(error);
            } else {
                return await this.execute(httpRequest);
            }
        } catch (error) {
            return serverError(error);
        }

    }
}