import { GetCommentByIdInterface } from "@application/interfaces/use-cases/comments/GetCommentByIdInterface.js";
import { GetCommentById } from "@application/use-cases/comments/GetCommentById.js";
import { CommentRepository } from "@infra/db/mongodb/repositories/CommentRepository.js";

export const makegetCommentById = (): GetCommentByIdInterface => {
    const commentRepository = new CommentRepository();

    return new GetCommentById(commentRepository)
}