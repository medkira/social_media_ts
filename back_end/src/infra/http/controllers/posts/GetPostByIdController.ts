import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";
import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { notFound, ok } from "@infra/http/helper/https.js";

export class GetPostByIdController extends BaseController {
    constructor(
        private readonly getPostById: GetPostByIdInterface,
    ) {
        super();
    }

    async execute(httpRequest: GetPostByIdController.Request): Promise<GetPostByIdController.Response> {
        const { id } = httpRequest.params!;
        const postOrError = await this.getPostById.execute(id);
        if (postOrError instanceof PostNotFoundError) {
            return notFound(postOrError);
        }
        return ok(postOrError);
    }

}

export namespace GetPostByIdController {
    export type Request = HttpRequest<undefined, { id: string }>
    export type Response = HttpResponse<GetPostByIdInterface.Response>

}