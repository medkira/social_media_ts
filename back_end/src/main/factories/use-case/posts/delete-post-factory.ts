import { DeletePostInterface } from "@application/interfaces/use-cases/posts/DeletePostInterface.js";
import { DeletePost } from "@application/use-cases/posts/DeletePost.js";
import { PostRepository } from "@infra/db/mongodb/repositories/PostRepository.js";

export const makeDeletePost = (): DeletePostInterface => {
    const postRepository = new PostRepository();
    return new DeletePost(postRepository)
}