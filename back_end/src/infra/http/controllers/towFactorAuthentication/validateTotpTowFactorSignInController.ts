import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { BaseController } from "../BaseController.js";
import { forbidden, ok } from "@infra/http/helper/https.js";
import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { Validation } from "@infra/http/interfaces/Validation.js";
import { ValidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/ValidateTotpInterface.js";
import { GenerateTokenAfterVlidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/GenrateTokenAfterValidateTotpInterface.js";

export class ValidateTotpTowFactorSignInController extends BaseController {
    constructor(
        private readonly verifyTotpValidation: Validation,
        private readonly verifyTotp: ValidateTotpInterface,
        private readonly generateTokenAfterVlidateTotp: GenerateTokenAfterVlidateTotpInterface,

    ) {
        super(verifyTotpValidation);
    }

    async execute(httpRequest: VerifyTotpController.Request): Promise<VerifyTotpController.Response> {
        const { totp } = httpRequest.body!;
        const userId = httpRequest.userId!;

        const result = await this.verifyTotp.execute({ totp, userId });


        if (result instanceof ForbiddenError) {
            return forbidden(result);
        }

        const token = await this.generateTokenAfterVlidateTotp.execute(userId);



        return ok({ message: 'TOTP verification successful', authenticationToken: token });

    }
}

export namespace VerifyTotpController {
    export type Request = HttpRequest<ValidateTotpInterface.Request>;
    export type Response = HttpResponse<{ message: string, authenticationToken: string } | ForbiddenError>;
}
