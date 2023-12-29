import { UseCase } from "../UseCase.js";

export interface UpdateUserEmailVerifyInterface extends UseCase<UpdateUserEmailVerifyInterface.Request, UpdateUserEmailVerifyInterface.Response> {
    execute(userId: UpdateUserEmailVerifyInterface.Request): Promise<UpdateUserEmailVerifyInterface.Response>;
}

export namespace UpdateUserEmailVerifyInterface {
    export type Request = string;
    export type Response = void;
}