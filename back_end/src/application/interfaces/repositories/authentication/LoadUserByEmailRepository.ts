import { User } from "@domain/entities/User.js";

export interface LoadUserByEmailRepository {
    loadUserByEmail(
        email: LoadUserByEmailRepository.request
    ): Promise<LoadUserByEmailRepository.response>
}

export namespace LoadUserByEmailRepository {
    export type request = string;
    export type response = User | null;
}