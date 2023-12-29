import { DeletePostRepository } from "@application/interfaces/repositories/posts/DeletePostInterface.js";
import { DeletePostInterface } from "@application/interfaces/use-cases/posts/DeletePostInterface.js";

export class DeletePost implements DeletePostInterface {
    constructor(
        private readonly deletePostRepository: DeletePostRepository,
    ) { }
    async execute(postId: DeletePostInterface.Request): Promise<DeletePostInterface.Response> {
        await this.deletePostRepository.deletePost(postId);
    }
}