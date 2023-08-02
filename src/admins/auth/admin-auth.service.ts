import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PasswordService } from "src/auths/password.service";
import { AdminService } from "../admin.service";
import { JwtService } from "@nestjs/jwt";
import { IAdmin, ICreateAdminInput } from "../interfaces";
import { AdminOtpRepository } from "../repositories/admin-otp.repository";
import { EmailService } from "src/notifications/email.service";


@Injectable()
export class AdminAuthService{
    constructor(private readonly passwordService:PasswordService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly adminOtpRepository:AdminOtpRepository,
        private readonly emailService: EmailService){}

    async validate(email:string, password:string):Promise<IAdmin>{
        const admin = await this.adminService.getByEmail(email)

        if(!admin){
            throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
        }

        //compare password
        const isPasswordValid = await this.passwordService.comparePassword(admin.password, password)

        if(!isPasswordValid || !admin.isActive){
            throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
        }

        if(admin.isRevoked){
            throw new HttpException("Your account is deactivated", HttpStatus.FORBIDDEN)
        }

        return admin

    }

    async login(email:string, inputPassword:string){
        const admin = await this.validate(email, inputPassword)
      

        const {password, ...payload} = admin

        return{
            message:"Login successful",
            token: this.jwtService.sign({...payload, type:'admin'})
        }
    }

    async getProfile(id:string){
        const admin = await this.adminService.getById(id)
        delete admin.password

        return admin
    }

    async acceptInvite(email:string, code:string){
        const otp = await this.adminOtpRepository.findOneBy({email,code})
        

        if(!otp){
            throw new HttpException("Invalid activation link", HttpStatus.BAD_REQUEST)
        }

        await this.adminService.updateStatusByEmail(email)

        await this.adminOtpRepository.delete({email})

        return{
            message: "Account successfully activated",
            status:true
        }
    }

    async invite(data:ICreateAdminInput){
        const admin = await this.adminService.getByEmail(data.email)
        if(admin){
            throw new HttpException("Account with email already exist", HttpStatus.CONFLICT)
        }

        const hashPassword = await this.passwordService.hashPassword(data.password)

        const newAdmin = await this.adminService.create({...data, password: hashPassword})
        const otp = this.passwordService.generateCode()

        await this.adminOtpRepository.insert({email: data.email, code:otp})

        // await this.emailService.sendActivationCode(newAdmin.fullName, otp, data.email)
        

        return{
            message:"Activation link have been sent to your mailbox",
            status: true
        }
    }
    
}