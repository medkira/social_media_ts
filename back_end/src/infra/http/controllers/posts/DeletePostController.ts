import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";
import { DeletePostInterface } from "@application/interfaces/use-cases/posts/DeletePostInterface.js";
import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { PermissionError } from "@infra/http/errors/PermissionError.js";
import { forbidden, noContent, notFound, ok } from "@infra/http/helper/https.js";

export class DeletePostController extends BaseController {

    constructor(
        private readonly getPostById: GetPostByIdInterface,
        private readonly deletePost: DeletePostInterface,
    ) {
        super();
    }



    async execute(httpRequest: DeletePostController.Request): Promise<DeletePostController.Response> {
        const userId = httpRequest.userId!;
        const { id } = httpRequest.params!;

        const postOrError = await this.getPostById.execute(id);

        if (postOrError instanceof PostNotFoundError) {
            return notFound(postOrError);
        }

        if (postOrError.userId !== userId) {
            return forbidden(new PermissionError())
        }

        await this.deletePost.execute(id);
        return ok({ "message": "Post deleted successfully", });
    }

}

export namespace DeletePostController {
    export type Request = HttpRequest<undefined, { id: string }>;
    export type Response = HttpResponse<undefined | PostNotFoundError | PermissionError>;
}