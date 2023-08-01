import { BaseEntity } from "src/core/base.entity";
import { Column, Entity } from "typeorm";



@Entity("AdminsOtp")
export class AdminsOtpEntity extends BaseEntity{

    @Column({unique:true})
    email:string

    @Column()
    code:string
}