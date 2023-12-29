import { MissingParamError } from "../errors/MissingParamError.js";
export class RequiredFieldValidation {
    fieldName;
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
        return null;
    }
}
//# sourceMappingURL=RequiredFieldValidation.js.map