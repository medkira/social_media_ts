import { SignInInterface } from "@application/interfaces/use-cases/authentication/SignInInterface.js";
import { BaseController } from "../BaseController.js";
import { CreateTOTPInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPInterface.js";
import { UnauthorizedError } from "@application/errors/UnauthorizedError.js";
import { forbidden, ok, unauthorized } from "@infra/http/helper/https.js";
import { HttpRequest } from "@infra/http/interfaces/HttpRequest.js";
import { HttpResponse } from "@infra/http/interfaces/HttpResponse.js";
import { CheckTowFactorAuthInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckTowFactorAuthInterface.js";
import { CheckEmailVerifiedInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CheckEmailVerifiedInterface.js";
import { SendTotpToEmailInterface } from "@application/interfaces/use-cases/towFactorAuthentication/SendTotpToEmailInterface.js";
import { CreateTOTPSecretInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPSecretInterface.js";
import { UserTotp } from "@domain/entities/UserTotp.js";


export class towFactorySignInController extends BaseController {
    constructor(
        private readonly signIn: SignInInterface,
        private readonly createTOTP: CreateTOTPInterface,
        private readonly createTOTPSecret: CreateTOTPSecretInterface,
        private readonly checkTowFactorAuth: CheckTowFactorAuthInterface,
        private readonly checkEmailverified: CheckEmailVerifiedInterface,
        private readonly sendTotpToEmail: SendTotpToEmailInterface,
    ) {
        super();
    }


    async execute(httpRequest: towFactorySignInController.Request): Promise<towFactorySignInController.Response> {

        const { email, password } = httpRequest.body!;

        // todo : i need to add a code to verifie if user enbaled tow factory auth if yes => notrmal sign in else createTOTP and send it 
        const isTwoFactorAuthEnabled = await this.checkTowFactorAuth.execute(email);
        // * normal sign in
        if (!isTwoFactorAuthEnabled) {
            const authenticationTokenOrError = await this.signIn.execute({ email, password });

            if (authenticationTokenOrError instanceof UnauthorizedError) {
                return unauthorized(authenticationTokenOrError)
            }

            return ok({
                authenticationToken: authenticationTokenOrError,
            });
        }


        // * create totp code and send it to the user email 

        const EmailVerifiedOrError = await this.checkEmailverified.execute(email)
        if (!EmailVerifiedOrError) {
            return forbidden(EmailVerifiedOrError);
        }

        const totpData = await this.createTOTP.execute(email);

        // ! start
        if (totpData instanceof UserTotp) {
            const { totp, userId } = totpData;
            this.sendTotpToEmail.execute({ email: email, totp: totp });



            const TotpSecret = await this.createTOTPSecret.execute({ totp, userId });
            return ok({
                message: `code sent to ${email}`,
                totpSecret: TotpSecret,
            });
        }


        // ! need to fix it in case of error
        return ok({});

    }
}


export namespace towFactorySignInController {
    export type Request = HttpRequest<SignInInterface.Request>
    export type Response = HttpResponse<{ message: string, totpSecret: string } | { authenticationToken: string } | UnauthorizedError>
}