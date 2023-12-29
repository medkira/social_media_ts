import { SendTotpToEmailInterface } from "@application/interfaces/use-cases/towFactorAuthentication/SendTotpToEmailInterface.js";
import { SendTotpToEmail } from "@application/use-cases/TowFactorAuthentication/SendTotpToEmail.js";

export const makeSendTotpToEmail = (): SendTotpToEmailInterface => {
    return new SendTotpToEmail();
}