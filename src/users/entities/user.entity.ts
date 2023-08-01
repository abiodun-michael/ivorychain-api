import { BaseEntity } from "src/core/base.entity";
import { Column, Entity } from "typeorm";



@Entity("users")
export class UsersEntity extends BaseEntity{

    @Column()
    firstName:string

    @Column()
    lastName: string

    @Column({unique:true})
    email:string

    @Column({nullable:true, unique:true})
    phoneNumber?:string

    @Column()
    password:string

    @Column({
        type: 'bool',
        default: false
    })
    isActive: boolean

    @Column({
        type: 'bool',
        default: false
    })
    isRevoked: boolean
}