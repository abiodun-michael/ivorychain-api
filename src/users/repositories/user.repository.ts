import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UsersEntity>{
    constructor(private readonly dataSource: DataSource){
        super(UsersEntity, dataSource.createEntityManager())
    }
}