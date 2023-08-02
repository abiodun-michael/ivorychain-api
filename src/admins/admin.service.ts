import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./repositories/admin.repository";
import { IAdmin, ICreateAdminInput, IUpdateAdminInput } from "./interfaces";



@Injectable()
export class AdminService{
    constructor(private readonly adminRepository: AdminRepository){}

    async create(data: ICreateAdminInput):Promise<IAdmin>{
        const admin = this.adminRepository.create(data)
        await this.adminRepository.insert(admin)

        return admin
    }

    async getAll():Promise<IAdmin[]>{
        return await this.adminRepository.find()
    }

    async getByEmail(email:string):Promise<IAdmin>{
        return await this.adminRepository.findOneBy({email})
    }

    async getById(id:string):Promise<IAdmin>{
        return await this.adminRepository.findOneBy({id})
    }

    async updateStatusByEmail(email:string){
        await this.adminRepository.update({email}, {isActive:true})
    }

    async updateById(data:IUpdateAdminInput, id:string): Promise<IAdmin>{
        await this.adminRepository.update({id}, data)
        return await this.adminRepository.findOneBy({id})
    }

    async updateStatusById(id:string, status:boolean): Promise<any>{
        return await this.adminRepository.update({id}, {isRevoked: status})
    }

}