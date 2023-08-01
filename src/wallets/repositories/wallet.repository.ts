import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { WalletsEntity } from "../entities/wallet.entity";


@Injectable()
export class WalletRepository extends Repository<WalletsEntity>{
    constructor(private readonly dataSource: DataSource){
        super(WalletsEntity, dataSource.createEntityManager())
    }
}