import { IUser } from "src/users/interfaces"


export interface IWallet{
    id:string
    user?:IUser
    balance:string
    updatedAt: Date
    createdAt: Date
}