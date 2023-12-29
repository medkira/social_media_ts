import { PostNotFoundError } from "@application/errors/PostNotFoundError.js";
import { GetPostByIdRepository } from "@application/interfaces/repositories/posts/GetPostByIdRepository.js";
import { UpdatePostRepository } from "@application/interfaces/repositories/posts/UpdatePostRepository.js";
import { UpdatePostInterface } from "@application/interfaces/use-cases/posts/UpdatePostInterface.js";

export class UpdatePost implements UpdatePostInterface {

    constructor(
        private readonly getPostByIdRepository: GetPostByIdRepository,
        private readonly updatePostRepository: UpdatePostRepository,
    ) { }

    async execute(params: UpdatePostInterface.Request): Promise<UpdatePostInterface.Rsponse> {
        const { postId, postData } = params;

        const post = this.getPostByIdRepository.getPostById(postId);
        if (!post) {
            return new PostNotFoundError();
        }
        return this.updatePostRepository.updatePost({ postId, postData })
    }

}











