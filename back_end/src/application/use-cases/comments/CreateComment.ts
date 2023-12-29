import { CreateCommentRepository } from "@application/interfaces/repositories/comments/CreateCommentRepository.js";
import { CreateCommentInterface } from "@application/interfaces/use-cases/comments/CreateCommentInterface.js";

export class CreateComment implements CreateCommentInterface {
    constructor(private readonly createCommentRepository: CreateCommentRepository) {

    }
    execute(commentData: CreateCommentInterface.Request): Promise<CreateCommentInterface.Response> {
        return this.createCommentRepository.createComment(commentData);
    }
}