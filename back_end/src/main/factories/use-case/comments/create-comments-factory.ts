import { CreateCommentInterface } from "@application/interfaces/use-cases/comments/CreateCommentInterface.js";
import { CreateComment } from "@application/use-cases/comments/CreateComment.js";
import { CommentRepository } from "@infra/db/mongodb/repositories/CommentRepository.js";

export const makeCreateComments = (): CreateCommentInterface => {
    const commentRepository = new CommentRepository();

    return new CreateComment(commentRepository);
}