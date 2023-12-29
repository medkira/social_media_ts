import { User } from "@domain/entities/User.js";
import { UseCase } from "../UseCase.js";
import { UserNotFoundError } from "@application/errors/UserNotFoundError.js";

export interface LoadUserByIdInterface extends UseCase<LoadUserByIdInterface.Request, LoadUserByIdInterface.Response> {
    execute(userId: LoadUserByIdInterface.Request): Promise<LoadUserByIdInterface.Response>
}

export namespace LoadUserByIdInterface {
    export type Request = string;
    export type Response = User | UserNotFoundError;
}