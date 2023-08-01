import { BaseEntity } from "src/core/base.entity";
import { Column, Entity } from "typeorm";



@Entity("usersOtp")
export class UsersOtpEntity extends BaseEntity{

    @Column({unique:true})
    email:string

    @Column()
    code:string
}