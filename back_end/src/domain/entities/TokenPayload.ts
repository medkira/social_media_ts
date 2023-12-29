export type DecodedTokenProps = {
    userId: string;
    totp?: string;
    createdAt?: Date;
    expiresAt?: Date;
};

export class DecodedToken {
    public readonly userId: string;

    public readonly totp?: string;

    public readonly createdAt?: Date;

    public readonly expiresAt?: Date;

    constructor(props: DecodedTokenProps) {
        this.userId = props.userId;
        this.totp = props.totp;
        this.createdAt = props.createdAt;
        this.expiresAt = props.expiresAt;
    }
}
