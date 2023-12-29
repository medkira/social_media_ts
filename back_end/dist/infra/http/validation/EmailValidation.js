import { InvalidParamError } from "../errors/InvalidParamError.js";
export class EmailValidation {
    fieldName;
    emailValidator;
    constructor(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    validate(input) {
        const isValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
        return null;
    }
}
//# sourceMappingURL=EmailValidation.js.map