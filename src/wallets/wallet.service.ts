import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IWallet } from "./interfaces";
import { WalletRepository } from "./repositories/wallet.repository";



@Injectable()
export class WalletService{
    constructor(private readonly walletRepository: WalletRepository){}

    async create(user: any):Promise<void>{
        await this.walletRepository.insert({user})
    }

    async deposit(amount:number, userId:string):Promise<any>{
         const wallet = await this.walletRepository.findOneBy({user:{id:userId}})
         if(!wallet){
            throw new HttpException("Wallet is not found", HttpStatus.NOT_FOUND)
         }

         const newBalance = wallet.balance + amount

         await this.walletRepository.update({user:{id:userId}},{balance: newBalance})

         return { 
            message:"Wallet credited successfully",
            status:true
         }
    }

    async withdraw(amount:number, userId:string):Promise<any>{
        const wallet = await this.walletRepository.findOneBy({user:{id:userId}})

        if(!wallet){
            throw new HttpException("Wallet is not found", HttpStatus.NOT_FOUND)
         }

        if(Number(wallet.balance) < amount){
            throw new HttpException("Insufficient fund", HttpStatus.NOT_ACCEPTABLE)
        }

        const newBalance = Number(wallet.balance) - amount

        await this.walletRepository.update({user:{id:userId}},{balance: newBalance.toString()})

        return {
            message:"Wallet debited succefully",
            status:true
        }
   }

   async transfer(amount:number, receiverWalletId:string, userId:string){
        const receiver = await this.walletRepository.findOneBy({id:receiverWalletId})

        if(!receiver){
            throw new HttpException("Invalid wallet id", HttpStatus.BAD_REQUEST)
        }

        const userWallet = await this.walletRepository.findOneBy({user:{id:userId}})

        if(receiver.id === userWallet.id){
            throw new HttpException("You cannot send money to yourself", HttpStatus.BAD_REQUEST)
        }

        if(Number(userWallet.balance) < amount){
            throw new HttpException("Insufficient funds", HttpStatus.BAD_REQUEST)
        }

        const debitBalance = Number(userWallet.balance) - amount
        const creditBalance = Number(receiver.balance) + amount

        await this.walletRepository.update({id:userWallet.id},{balance:debitBalance.toString()})
        await this.walletRepository.update({id:receiver.id},{balance:creditBalance.toString()})

        return {
            message:"Transfer successful",
            status:true
        }

   }

   
    async getById(id:string):Promise<IWallet>{
        return await this.walletRepository.findOneBy({id})
    }

    async getByUserId(id:string):Promise<IWallet>{
        return await this.walletRepository.findOneBy({user:{id}})
    }

    async getAll():Promise<any>{
        return await this.walletRepository.find()
    }
}