import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";
import { EmailValidatorAdapter } from "@infra/http/validator/EmailValidatorAdapter.js";


export const makeVerifyTotpValidation = (): ValidationComposite => {
    const emailValidator = new EmailValidatorAdapter();
    return new ValidationComposite([
        new RequiredFieldValidation('totp'),
    ], 'body');
}