import { CreatePostInterface } from "@application/interfaces/use-cases/posts/CreatePostInterface.js";
import { CreatePost } from "@application/use-cases/posts/CreatePost.js";
import { PostRepository } from "@infra/db/mongodb/repositories/PostRepository.js";

export const makeCreatePost = (): CreatePostInterface => {

    const postRepository = new PostRepository();
    return new CreatePost(postRepository);
}