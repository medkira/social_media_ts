import { DeleteCommentInterface } from "@application/interfaces/use-cases/comments/DeleteCommentInterface.js";
import { DeleteComment } from "@application/use-cases/comments/DeleteComment.js";
import { CommentRepository } from "@infra/db/mongodb/repositories/CommentRepository.js";

export const makeDeleteComment = (): DeleteCommentInterface => {
    const commentRepository = new CommentRepository();

    return new DeleteComment(commentRepository);
}