
export interface IUser{
    id:string
    firstName:string
    lastName:string
    email:string
    password:string
    createdAt: Date
    updatedAt: Date
}

export type ICreateUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export type IUpdateUserInput = Omit<ICreateUserInput, 'id'|'password'|'email'>