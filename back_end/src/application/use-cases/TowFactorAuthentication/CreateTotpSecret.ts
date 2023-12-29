import { JWTGenerator } from "@application/interfaces/cryptography/JWTGenerator.js";
import { CreateTOTPSecretInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPSecretInterface.js";

export class CreateTotpSecret implements CreateTOTPSecretInterface {

    constructor(
        private readonly jwtGenerator: JWTGenerator,
    ) { }

    // ! in the 2FA i am sending a whole object here but the genrate in the jwt adapter is exepting a string....

    async execute(totp: any): Promise<string> {
        return this.jwtGenerator.generate(totp);
    }



}