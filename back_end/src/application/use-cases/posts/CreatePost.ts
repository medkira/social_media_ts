import { CreatePostRepository } from "@application/interfaces/repositories/posts/CreatePostRepository.js";
import { CreatePostInterface } from "@application/interfaces/use-cases/posts/CreatePostInterface.js";


export class CreatePost implements CreatePostInterface {
    constructor(private readonly createPostRepository: CreatePostRepository) { }

    async execute(postData: CreatePostInterface.Request): Promise<string> {
        return this.createPostRepository.createPost({
            ...postData,
            totalComments: 0,
        })

    }

}