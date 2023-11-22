import { CreateUSerRepository, CreateUserRepository } from "@application/interfaces/repositories/authentication/CreateUserRepository.js";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/authentication/LoadUserByEmailRepository.js";
import UserModel from "../models/user.model.js";
import { mapDocument, objectIdToString } from "../helpers/mappers.js";


export class UserRepository implements CreateUserRepository, LoadUserByEmailRepository {



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


