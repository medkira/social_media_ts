import { UseCase } from "../UseCase.js";

export interface DeleteCommentInterface extends UseCase<DeleteCommentInterface.Request, DeleteCommentInterface.Response> {
    execute(commentId: DeleteCommentInterface.Request): Promise<DeleteCommentInterface.Response>
}

export namespace DeleteCommentInterface {
    export type Request = string;
    export type Response = void;
}