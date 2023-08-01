import { BaseEntity } from "src/core/base.entity";
import { Column, Entity } from "typeorm";



@Entity("admins")
export class AdminEntity extends BaseEntity{
    @Column()
    fullName:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({type:'bool', default:false})
    isActive: boolean

    @Column({type:'bool', default:false})
    isRevoked: boolean
}