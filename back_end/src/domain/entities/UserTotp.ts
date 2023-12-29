export type UserTotpProps = {
    userId: string,
    totp: string
    createdAt?: Date,
    expiresAt?: Date,
}

export class UserTotp {
    public readonly userId: string;

    public readonly totp: string;

    public readonly createdAt?: Date;

    public readonly expiresAt?: Date;

    constructor(props: UserTotpProps) {
        this.userId = props.userId;
        this.totp = props.totp;
        this.createdAt = props.createdAt;
        this.expiresAt = props.expiresAt;
    }
}