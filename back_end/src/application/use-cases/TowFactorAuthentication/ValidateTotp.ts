import { ForbiddenError } from "@application/errors/ForbiddenError.js";
import { UserTotpNotFound } from "@application/errors/UserTotpNotFound.js";
import { HashComparer } from "@application/interfaces/cryptography/HashComparer.js";
import { GetUserTotpByUserIdRepository } from "@application/interfaces/repositories/towFactoryAuthentication/GetUserTotpByUserIdRepository.js";
import { ValidateTotpInterface } from "@application/interfaces/use-cases/towFactorAuthentication/ValidateTotpInterface.js";

export class ValidateTotp implements ValidateTotpInterface {
    constructor(
        private readonly getUserTotpByUserIdRepository: GetUserTotpByUserIdRepository,
        private readonly hashCompare: HashComparer,

    ) { }



    async execute(userTotpData: ValidateTotpInterface.Request): Promise<ValidateTotpInterface.Response> {
        const { totp, userId } = userTotpData;

        const userTotp = await this.getUserTotpByUserIdRepository.getUserTotpByUserId(userId);

        if (!userTotp) {
            return new UserTotpNotFound();
        }


        if (this.isExpired(userTotp.expiresAt!)) {
            return new ForbiddenError();
        }


        const isTotpValid = await this.hashCompare.compare(totp, userTotp.totp);
        if (!isTotpValid) {
            return new ForbiddenError();
        }

        return isTotpValid;



    }

    private isExpired(expirationDate: Date): boolean {
        const currentTimestamp = new Date();
        const expirationTimestamp = expirationDate;
        return currentTimestamp > expirationTimestamp;
    }

}