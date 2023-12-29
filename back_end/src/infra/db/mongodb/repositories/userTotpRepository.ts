import { CreateUserTotpRepository } from "@application/interfaces/repositories/towFactoryAuthentication/CreateUserTotpRepository.js";
import UserTotpModel from "../models/userTotp.model.js";
import { DeleteUserTotpByUserIdpRepository } from "@application/interfaces/repositories/towFactoryAuthentication/DeleteUserTotpByUserIdpRepository.js";
import { GetUserTotpByUserIdRepository } from "@application/interfaces/repositories/towFactoryAuthentication/GetUserTotpByUserIdRepository.js";
import { mapDocument } from "../helpers/mappers.js";

export class UserTotpRepository implements
    CreateUserTotpRepository,
    DeleteUserTotpByUserIdpRepository,
    GetUserTotpByUserIdRepository {

    async getUserTotpByUserId(userId: string): Promise<GetUserTotpByUserIdRepository.Response> {
        const rawUserTotp = await UserTotpModel.findOne({ userId: userId });

        return rawUserTotp && mapDocument(rawUserTotp);
    }


    async deleteUserTotp(userId: string): Promise<DeleteUserTotpByUserIdpRepository.Response> {
        await UserTotpModel.findOneAndDelete({ userId: userId });
    }


    async createUserTotp(userTotpData: CreateUserTotpRepository.Request): Promise<CreateUserTotpRepository.Response> {

        const userTotp = new UserTotpModel({
            ...userTotpData,
            createdAt: new Date,
        });

        await userTotp.save();
    }

}