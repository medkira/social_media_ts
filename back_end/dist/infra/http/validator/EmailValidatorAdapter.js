import validator from "validator";
export class EmailValidatorAdapter {
    isValid(email) {
        return validator.isEmail(email);
    }
}
//# sourceMappingURL=EmailValidatorAdapter.js.map