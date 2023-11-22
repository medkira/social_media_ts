import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { UseCase } from "../UseCase.js";

export interface SignInInterface
    extends UseCase<SignInInterface.Request, SignInInterface.Response> {
    execute(credentials: SignInInterface.Request): Promise<SignInInterface.Response>;
};


export namespace SignInInterface {
    export type Request = { email: string, password: string };
    export type Response = string | UnauthorizedError;
}