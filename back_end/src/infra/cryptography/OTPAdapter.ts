import { OTPGenerator } from "@application/interfaces/cryptography/OTPGenerator.js";

export class TOTPAdapter implements OTPGenerator {

    generate(): string {
        const otp = Math.floor(1000 + Math.random() * 9000);

        return otp.toString();
    }

}

