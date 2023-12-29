import { CreateTOTPInterface } from "@application/interfaces/use-cases/towFactorAuthentication/CreateTOTPInterface.js";
import { CreateTOTP } from "@application/use-cases/TowFactorAuthentication/CreateTOTP.js";
import { BcryptAdapter } from "@infra/cryptography/BcryptAdaptor.js";
import { TOTPAdapter } from "@infra/cryptography/OTPAdapter.js";
import { UserRepository } from "@infra/db/mongodb/repositories/UserRepositort.js";
import { UserTotpRepository } from "@infra/db/mongodb/repositories/userTotpRepository.js";
import { env } from "process";

export const makeCreateTOTP = (): CreateTOTPInterface => {
    const otpAdapter = new TOTPAdapter()
    const userTotpRepository = new UserTotpRepository();
    const bcrytAdapter = new BcryptAdapter(Number(env.bcryptSalt));
    const userRepository = new UserRepository();

    return new CreateTOTP(otpAdapter,
        userTotpRepository,
        userTotpRepository,
        userTotpRepository,
        bcrytAdapter,
        userRepository,);
}