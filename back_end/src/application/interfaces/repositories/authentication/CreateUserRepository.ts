import { UserProps } from "@domain/entities/User.js"


export interface CreateUserRepository {
    createUser(userData: CreateUSerRepository.Request): Promise<CreateUSerRepository.Response>
}

export namespace CreateUSerRepository {
    export type Request = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;
    export type Response = string;
}