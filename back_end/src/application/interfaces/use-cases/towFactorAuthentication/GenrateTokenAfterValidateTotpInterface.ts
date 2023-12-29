import { type } from "os";
import { UseCase } from "../UseCase.js";

export interface GenerateTokenAfterVlidateTotpInterface extends UseCase<GenerateTokenAfterVlidateTotpInterface.Request, GenerateTokenAfterVlidateTotpInterface.Response> {
    execute(id: GenerateTokenAfterVlidateTotpInterface.Request): Promise<GenerateTokenAfterVlidateTotpInterface.Response>
}

export namespace GenerateTokenAfterVlidateTotpInterface {
    export type Request = string;
    export type Response = string;
}