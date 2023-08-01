import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { ICreateUserInput, IUpdateUserInput, IUser } from "./interfaces";
import { WalletService } from "src/wallets/wallet.service";


@Injectable()
export class UserService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly walletService: WalletService){}

    async create(data:ICreateUserInput):Promise<IUser>{
        const user = this.userRepository.create(data)

        await this.userRepository.insert(user)

        await this.walletService.create(user)

        return user
    }

    async updateById(data:IUpdateUserInput, id:string): Promise<IUser>{
        await this.userRepository.update({id}, data)
        return await this.userRepository.findOneBy({id})
    }

    async getAll():Promise<IUser[]>{
        return await this.userRepository.find()
    }

    async getById(id:string):Promise<IUser>{
        return await this.userRepository.findOneBy({id})
    }

    async getByEmail(email:string):Promise<IUser>{
        return await this.userRepository.findOneBy({email})
    }

    async activate(email:string){
        await this.userRepository.update({email}, {isActive:true})
    }

}