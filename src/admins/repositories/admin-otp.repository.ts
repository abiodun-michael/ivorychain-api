import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AdminsOtpEntity } from "../entities/admin-otp.entity";

@Injectable()
export class AdminOtpRepository extends Repository<AdminsOtpEntity>{
    constructor(private readonly dataSource: DataSource){
        super(AdminsOtpEntity, dataSource.createEntityManager())
    }
}