import { UserProps } from "@domain/entities/User.js"
import { UseCase } from "../UseCase.js"
import { EmailInUseError } from "@application/errors/EmailInUseError.js";

export interface SignUpInterface extends UseCase<SignUpInterface.Request, SignUpInterface.Response> {
    execute(userData: SignUpInterface.Request): Promise<SignUpInterface.Response>
}

export namespace SignUpInterface {
    export type Request = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'isTwoFactorAuthEnabled' | 'isEmailVerified'>
    export type Response = string | EmailInUseError;
}