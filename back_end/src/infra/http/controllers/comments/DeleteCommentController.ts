import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { CommentNotFoundError } from "@application/errors/CommentNotFoundError.js";
import { PermissionError } from "@infra/http/errors/PermissionError.js";
import { DeleteCommentInterface } from "@application/interfaces/use-cases/comments/DeleteCommentInterface.js";
import { GetCommentByIdInterface } from "@application/interfaces/use-cases/comments/GetCommentByIdInterface.js";
import { forbidden, noContent, notFound, ok } from "@infra/http/helper/https.js";
import { UpdatePostTotalCommentsInterface } from "@application/interfaces/use-cases/posts/UpdatePostTotalCommentsInterface.js";
export class DeleteCommentControllert extends BaseController {

    constructor(
        private readonly deleteComment: DeleteCommentInterface,
        private readonly getCommentById: GetCommentByIdInterface,
        private readonly updatePosrTotalComments: UpdatePostTotalCommentsInterface,
    ) {
        super()
    }

    async execute(httpRequest: DeleteCommentControllert.Request): Promise<DeleteCommentControllert.Response> {
        const { id } = httpRequest.params!;
        const userId = httpRequest.userId!;

        const commentOrError = await this.getCommentById.execute(id);
        if (commentOrError instanceof CommentNotFoundError) {
            return notFound(commentOrError);
        }

        if (commentOrError.userId !== userId) {
            return forbidden(new PermissionError());
        }

        await this.deleteComment.execute(id)
        await this.updatePosrTotalComments.execute(commentOrError.postId);
        // return noContent();

        return ok({ "message": "Comment deleted successfully" });
    }

}


export namespace DeleteCommentControllert {
    export type Request = HttpRequest<undefined, { id: string }>;
    export type Response = HttpResponse<undefined | CommentNotFoundError | PermissionError>

}