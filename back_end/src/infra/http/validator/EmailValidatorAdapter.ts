import validator from "validator";
import { EmailValidator } from "../validation/interfaces/EmailValidator.js";
export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.default.isEmail(email);
    }
}