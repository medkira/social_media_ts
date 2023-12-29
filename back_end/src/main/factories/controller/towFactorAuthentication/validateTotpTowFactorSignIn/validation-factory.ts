import { RequiredFieldValidation } from "@infra/http/validation/RequiredFieldValidation.js";
import { ValidationComposite } from "@infra/http/validation/ValidationComposite.js";
import { EmailValidatorAdapter } from "@infra/http/validator/EmailValidatorAdapter.js";


export const makeValidateTotpValidation = (): ValidationComposite => {
    return new ValidationComposite([
        new RequiredFieldValidation('totp'),
    ], 'body');
}