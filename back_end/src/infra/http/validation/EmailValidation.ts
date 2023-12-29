import { InvalidParamError } from "../errors/InvalidParamError.js";
import { Validation } from "../interfaces/Validation.js";
import { EmailValidator } from '@infra/http/validation/interfaces/EmailValidator.js';

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator,
    ) { }

    validate(input: any): Error | null {
        const isValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
        return null;
    }

}