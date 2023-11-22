export class ValidationComposite {
    validations;
    segment;
    constructor(validations, segment) {
        this.validations = validations;
        this.segment = segment;
    }
    validate(request) {
        const input = request[this.segment];
        return this.validations.reduce((error, validation) => error || validation.validate(input), null);
    }
}
//# sourceMappingURL=ValidationComposite.js.map