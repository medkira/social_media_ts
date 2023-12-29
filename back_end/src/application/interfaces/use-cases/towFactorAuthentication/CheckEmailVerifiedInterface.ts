import { User } from "@domain/entities/User.js";
import { UseCase } from "../UseCase.js";
import { EmailNotVerifiedError } from "@application/errors/EmailNotVerifiedError.js";


export interface CheckEmailVerifiedInterface extends UseCase<CheckEmailVerifiedInterface.Request, CheckEmailVerifiedInterface.Response> {
    execute(email: CheckEmailVerifiedInterface.Request): Promise<CheckEmailVerifiedInterface.Response>;
}

export namespace CheckEmailVerifiedInterface {
    export type Request = User['email'];
    export type Response = Boolean | EmailNotVerifiedError;
}