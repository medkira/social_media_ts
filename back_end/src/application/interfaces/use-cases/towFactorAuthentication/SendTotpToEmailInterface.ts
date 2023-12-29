import { UseCase } from "../UseCase.js";

export interface SendTotpToEmailInterface extends UseCase<SendTotpToEmailInterface.Request, SendTotpToEmailInterface.Response> {
    execute(request: SendTotpToEmailInterface.Request): Promise<SendTotpToEmailInterface.Response>

}

export namespace SendTotpToEmailInterface {
    export type Request = {
        totp: string;
        email: string
    }
    export type Response = string;
}