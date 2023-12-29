import { UserNotFoundError } from "@application/errors/UserNotFoundError.js";
import { User, UserProps } from "@domain/entities/User.js";

export interface LoadUserByIdRepository {
    LoadUserById(userId: LoadUserByIdRepository.Request): Promise<LoadUserByIdRepository.Response>;
}

export namespace LoadUserByIdRepository {
    export type Request = string;
    export type Response = User | UserNotFoundError;
}