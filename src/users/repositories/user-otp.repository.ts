import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsersOtpEntity } from "../entities/user-otp.entity";

@Injectable()
export class UserOtpRepository extends Repository<UsersOtpEntity>{
    constructor(private readonly dataSource: DataSource){
        super(UsersOtpEntity, dataSource.createEntityManager())
    }
}