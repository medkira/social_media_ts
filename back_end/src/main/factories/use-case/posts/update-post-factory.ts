import { UpdatePostInterface } from "@application/interfaces/use-cases/posts/UpdatePostInterface.js";
import { UpdatePost } from "@application/use-cases/posts/UpdatePost.js";
import { PostRepository } from "@infra/db/mongodb/repositories/PostRepository.js";

export const makeUpdatePost = (): UpdatePostInterface => {
    const postRepository = new PostRepository();
    return new UpdatePost(postRepository, postRepository);
}