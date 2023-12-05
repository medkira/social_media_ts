import { DeleteCommentRepository } from "@application/interfaces/repositories/comments/DeleteCommentRepository.js";
import { DeleteCommentInterface } from "@application/interfaces/use-cases/comments/DeleteCommentInterface.js";

export class DeleteComment implements DeleteCommentInterface {

    constructor(private readonly deleteCommentRepository: DeleteCommentRepository) { }

    async execute(commentId: DeleteCommentInterface.Request): Promise<DeleteCommentInterface.Response> {
        await this.deleteCommentRepository.deleteComment(commentId);
    }

}