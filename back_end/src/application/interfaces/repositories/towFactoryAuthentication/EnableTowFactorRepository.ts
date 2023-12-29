export interface EnableTowFactorAuthRepository {
    EnableTowFactorAuth(userId: EnableTowFactorAuthRepository.Request): Promise<EnableTowFactorAuthRepository.Response>;

}
export namespace EnableTowFactorAuthRepository {
    export type Request = string;
    export type Response = void;
}