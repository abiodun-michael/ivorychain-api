import { BaseEntity } from "src/core/base.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";



@Entity("wallets")
export class WalletsEntity extends BaseEntity{

    @Column({type:'real', default:0})
    balance: string

    @OneToOne(()=>UsersEntity)
    @JoinColumn()
    user: UsersEntity
}