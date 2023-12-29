import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { GetPostByIdRepository } from "@application/interfaces/repositories/posts/GetPostByIdRepository.js";
import { GetPostByIdInterface } from "@application/interfaces/use-cases/posts/GetPostByIdInterface.js";

export class GetPostById implements GetPostByIdInterface {

    constructor(
        private readonly GetPostByIdRepositroy: GetPostByIdRepository,
    ) { }

    async execute(postId: string): Promise<GetPostByIdInterface.Response> {
        const post = await this.GetPostByIdRepositroy.getPostById(postId);
        if (!post) {
            return new PostNotFoundError();
        }
        return post;

    }

}