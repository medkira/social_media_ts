import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { UpdatePostInterface } from "@application/interfaces/use-cases/posts/UpdatePostInterface.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";
import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { PermissionError } from "@infra/http/errors/PermissionError.js";
import { forbidden, notFound, ok } from "@infra/http/helper/https.js";

export class UpdatePostController extends BaseController {
    constructor(
        private readonly updatePostValidation: Validation,
        private readonly getPostById: GetPostByIdInterface,
        private readonly updatePost: UpdatePostInterface,
    ) {
        super(updatePostValidation);
    }

    async execute(httpRequest: UpdatePostController.Request): Promise<UpdatePostController.Response> {
        const userId = httpRequest.userId!;
        const { id } = httpRequest.params!;
        const { title, text } = httpRequest.body!;

        const postOrError = await this.getPostById.execute(id);

        if (postOrError instanceof PostNotFoundError) {
            return notFound(postOrError);
        }

        if (postOrError.userId !== userId) {
            return forbidden(new PermissionError());
        }

        const updatedPostOrError = await this.updatePost.execute({
            postId: id,
            postData: { title, text }
        })

        // if (updatedPostOrError instanceof PostNotFoundError) {
        //     return notFound(updatedPostOrError);
        // }

        return ok(updatedPostOrError);
    }

}

export namespace UpdatePostController {
    export type Request = HttpRequest<UpdatePostInterface.PostDataType, { id: string }>
    export type Response = HttpResponse<UpdatePostInterface.Rsponse | PostNotFoundError | PermissionError>
}