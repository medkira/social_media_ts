import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { CreatePostInterface } from "@application/interfaces/use-cases/posts/CreatePostInterface.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { ok } from "@infra/http/helper/https.js";




export class CreatePostController extends BaseController {

    constructor(
        private readonly createPostValidation: Validation,
        private readonly createPost: CreatePostInterface,
    ) {
        super(createPostValidation);
    }

    async execute(httpRequest: CreatePostController.Request): Promise<CreatePostController.Response> {
        const userId = httpRequest.userId!;
        const { title, text } = httpRequest.body!;
        const postId = await this.createPost.execute({
            userId, title, text,
        })

        return ok({ postId, message: "post created successfully" });
    }
}


export namespace CreatePostController {
    export type Request = HttpRequest<Omit<CreatePostInterface.Request, 'userId'>>;
    export type Response = HttpResponse<{ postId: string }>;
}