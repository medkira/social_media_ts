import { UseCase } from "../UseCase.js";

export interface EnableTowFactorAuthInterface extends UseCase<EnableTowFactorAuthInterface.Request, EnableTowFactorAuthInterface.Response> {
    execute(userId: EnableTowFactorAuthInterface.Request): Promise<EnableTowFactorAuthInterface.Response>;
}

export namespace EnableTowFactorAuthInterface {
    export type Request = string;
    export type Response = void;
}