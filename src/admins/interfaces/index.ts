

export interface IAdmin{
    id:string
    fullName:string
    email:string
    isActive:boolean
    isRevoked:boolean
    createdAt: Date
    updatedAt: Date
    password:string
}

export type ICreateAdminInput = Omit<IAdmin, 'createdAt' | 'updatedAt' | 'id' | 'isActive' | 'isRevoked'>

export type IUpdateAdminInput = Omit<IAdmin, 'createdAt' | 'updatedAt' | 'id' | 'isActive' | 'isRevoked' | 'email' | 'password'>