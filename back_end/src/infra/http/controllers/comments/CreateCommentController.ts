import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { CreateCommentInterface } from "@application/interfaces/use-cases/comments/CreateCommentInterface.js";
import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";
import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { notFound, ok } from "@infra/http/helper/https.js";
import { UpdatePostTotalCommentsInterface } from "@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface.js";

export class CreateCommentController extends BaseController {

    constructor(
        private readonly createCommentValidation: Validation,
        private readonly getPostById: GetPostByIdInterface,
        private readonly creatComment: CreateCommentInterface,
        private readonly updatePostTotalComments: UpdatePostTotalCommentsInterface,

    ) {
        super(createCommentValidation);
    }

    async execute(httpRequest: CreateCommentController.Request): Promise<CreateCommentController.Response> {
        const userId = httpRequest.userId!;
        const { postId, title, text } = httpRequest.body!;
        const postOrError = await this.getPostById.execute(postId);

        if (postOrError instanceof PostNotFoundError) {
            return notFound(postOrError);
        }

        const id = await this.creatComment.execute({
            userId, postId, title, text
        });

        await this.updatePostTotalComments.execute(postId);

        return ok({ id })
    }

}


export namespace CreateCommentController {
    export type Request = HttpRequest<Omit<CreateCommentInterface.Request, 'userId'>>;
    export type Response = HttpResponse<{ commentId: string } | PostNotFoundError>
}