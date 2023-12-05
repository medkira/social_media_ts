import { BaseController } from "@infra/http/controllers/BaseController.js";
import { DeleteCommentControllert } from "@infra/http/controllers/comments/DeleteCommentController.js";
import { makeDeleteComment } from "@main/factories/use-case/comments/delete-comment-factory.js";
import { makegetCommentById } from "@main/factories/use-case/comments/get-comment-by-id-factory.js";
import { makeUpdatePostTotalComments } from "@main/factories/use-case/posts/update-post-total-comments-factory.js";

export const makeDeleteCommentController = (): BaseController => {
    const deleteCommentUseCase = makeDeleteComment();
    const getCommentByIdUseCase = makegetCommentById();
    const updatePostTotalCommentsUseCase = makeUpdatePostTotalComments();

    return new DeleteCommentControllert(
        deleteCommentUseCase,
        getCommentByIdUseCase,
        updatePostTotalCommentsUseCase,
    );

}