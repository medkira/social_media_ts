import { CreateUSerRepository, CreateUserRepository } from "@application/interfaces/repositories/authentication/CreateUserRepository.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import UserModel from "../models/user.model.js";
import { mapDocument, objectIdToString, stringToObjectId } from "../helpers/mappers.js";
import { UpdateUserEmailVerifyRepository } from "@application/interfaces/repositories/towFactoryAuthentication/updateUserEmailVerifyReposirtory.js";
import { EnableTowFactorAuthRepository } from "@application/interfaces/repositories/towFactoryAuthentication/EnableTowFactorRepository.js";
import { LoadUserByIdRepository } from "@application/interfaces/repositories/towFactoryAuthentication/LoadUserByIdRepository.js";


export class UserRepository implements
    CreateUserRepository,
    LoadUserByEmailRepository,
    UpdateUserEmailVerifyRepository,
    EnableTowFactorAuthRepository,
    LoadUserByIdRepository {


    async LoadUserById(userId: string): Promise<LoadUserByIdRepository.Response> {
        const rawuser = await UserModel.findById(stringToObjectId(userId));
        return rawuser && mapDocument(rawuser);
    }


    async EnableTowFactorAuth(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(stringToObjectId(userId),
            { $set: { isTwoFactorAuthEnabled: true } });
    }

    // todo : i can make response true if the validation is done
    // todo : just to make sure that the validation is done
    async updateUserEmailVerify(userId: string): Promise<void> {
        await UserModel.findOneAndUpdate(stringToObjectId(userId),
            { $set: { isEmailVerified: true } });
    }

    async loadUserByEmail(email: string): Promise<LoadUserByEmailRepository.response> {
        const rawuser = await UserModel.findOne({ email });
        return rawuser && mapDocument(rawuser);
    }
    async createUser(userData: CreateUSerRepository.Request): Promise<string> {

        const user = new UserModel({
            ...userData,
            createdAt: new Date()
        })
        const savedUser = await user.save();
        const userId = objectIdToString(savedUser._id);

        return userId;
    }

}


