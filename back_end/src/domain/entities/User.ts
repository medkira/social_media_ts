export type UserProps = {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isTwoFactorAuthEnabled: boolean;
    isEmailVerified: boolean;
};

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly isTwoFactorAuthEnabled: boolean;
    public readonly isEmailVerified: boolean;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.isTwoFactorAuthEnabled = props.isTwoFactorAuthEnabled;
        this.isEmailVerified = props.isEmailVerified;

    }
}
