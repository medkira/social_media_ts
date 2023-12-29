import { JWTGenerator } from "@application/interfaces/cryptography/JWTGenerator.js";
import { GenerateTokenAfterVlidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/GenrateTokenAfterValidateTotpInterface.js";

export class GenerateTokenAfterVlidateTotp implements GenerateTokenAfterVlidateTotpInterface {
    constructor(
        private readonly jwtGenerator: JWTGenerator,

    ) { }


    async execute(id: string): Promise<string> {
        return this.jwtGenerator.generate(id);
    }
}