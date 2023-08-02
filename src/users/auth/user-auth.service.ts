import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserOtpRepository } from "../repositories/user-otp.repository";
import { UserService } from "../user.service";
import { ICreateUserInput } from "../interfaces";
import { PasswordService } from "src/auths/password.service";
import { EmailService } from "src/notifications/email.service";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class UserAuthService{
    constructor(
        private readonly userOtpRepository:UserOtpRepository,
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ){}


    async validate(email:string, password:string){
        const user = await this.userService.getByEmail(email)

        if(!user){
            throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
        }

        //compare password
        const isPasswordValid = await this.passwordService.comparePassword(user.password, password)

        if(!isPasswordValid){
            throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
        }

        return user

    }

    async login(email:string, inputPassword:string){
        const user = await this.validate(email, inputPassword)
      
        const {password, ...payload} = user

        return{
            message:"Login successful",
            token: this.jwtService.sign({...payload, type:'user'})
        }
        
    }

    async invite(data:ICreateUserInput){
        const user = await this.userService.getByEmail(data.email)
        if(user){
            throw new HttpException("Account with email already exist", HttpStatus.CONFLICT)
        }

        const hashPassword = await this.passwordService.hashPassword(data.password)

        const newUser = await this.userService.create({...data, password: hashPassword})
        const otp = this.passwordService.generateCode()

        await this.userOtpRepository.insert({email: data.email, code:otp})

        // await this.emailService.sendActivationCode(newUser.firstName, otp, data.email)
        

        return{
            message:"Activation link have been sent to your mailbox",
            status: true
        }
    }

    async acceptInvite(email:string, code:string){
        const otp = await this.userOtpRepository.findOneBy({email, code})

        if(!otp){
            throw new HttpException("Invalid activation link", HttpStatus.BAD_REQUEST)
        }

        await this.userService.activate(email)

        await this.userOtpRepository.delete({email})

        return{
            message: "Account successfully activated",
            status:true
        }
    }

    async getProfile(id:string){
        const user = await this.userService.getById(id)

        return{
            message:"Profile fetched successfully",
            data: user
        }
    }

    async updateStatusById(id:string){
        const user = await this.userService.getById(id)

        if(!user){
            throw new HttpException("Invalid id", HttpStatus.BAD_REQUEST)
        }

        await this.userService
        .updateStatusById(id, !user.isRevoked)

        return {
            message:"User status updated",
            status:true
        }
    }
}