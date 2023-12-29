import { HashGenerator } from "@application/interfaces/cryptography/HashGenerator.js";
import { OTPGenerator } from "@application/interfaces/cryptography/OTPGenerator.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import { CreateUserTotpRepository } from "@application/interfaces/repositories/towFactoryAuthentication/CreateUserTotpRepository.js";
import { DeleteUserTotpByUserIdpRepository } from "@application/interfaces/repositories/towFactoryAuthentication/DeleteUserTotpByUserIdpRepository.js";
import { GetUserTotpByUserIdRepository } from "@application/interfaces/repositories/towFactoryAuthentication/GetUserTotpByUserIdRepository.js";
import { CreateTOTPInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPInterface.js";
import { UserTotp, UserTotpProps } from "@domain/entities/UserTotp.js";

export class CreateTOTP implements CreateTOTPInterface {

    constructor(
        private readonly otpGenerator: OTPGenerator,
        private readonly createUserTotpRepository: CreateUserTotpRepository,
        private readonly getUserTotpByUserIdRepository: GetUserTotpByUserIdRepository,
        private readonly deleteUserTotpByUserIdpRepository: DeleteUserTotpByUserIdpRepository,
        private readonly hashGenerator: HashGenerator,
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,

    ) { }
    async execute(email: CreateTOTPInterface.Request): Promise<CreateTOTPInterface.Response> {

        const user = await this.loadUserByEmailRepository.loadUserByEmail(email);

        if (!user) {
            // todo fix it
            return "new UnauthorizedError();"
        }

        const userTotp = await this.getUserTotpByUserIdRepository.getUserTotpByUserId(user.id);

        if (userTotp) {
            await this.deleteUserTotpByUserIdpRepository.deleteUserTotp(userTotp.userId);
        }



        const otp = this.otpGenerator.generate();
        const hashedTotp = await this.hashGenerator.hash(otp);

        //  expiration time (30 seconds from now)
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 30);




        this.createUserTotpRepository.createUserTotp({
            userId: user?.id,
            totp: hashedTotp,
            expiresAt: expirationTime,
        });


        // ! i think this wrong and i need to change it

        const userTotpProps: UserTotpProps = {
            userId: user?.id,
            totp: otp,
            createdAt: new Date(),
            expiresAt: expirationTime // Expires in 1 hour
        };

        const userTotpInstance = new UserTotp(userTotpProps);

        // ! change this later to abtter solution 
        // ! this class should reuturn only  TOTP code but i will make it return  totp data (userid , totp)
        return userTotpInstance;
    }
}