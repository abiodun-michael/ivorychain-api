import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AdminsOtpEntity } from "src/admins/entities/admin-otp.entity";
import { AdminEntity } from "src/admins/entities/admin.entity";
import { UsersOtpEntity } from "src/users/entities/user-otp.entity";
import { UsersEntity } from "src/users/entities/user.entity";
import { WalletsEntity } from "src/wallets/entities/wallet.entity";




@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    
    constructor(
        private readonly configService:ConfigService
    ){}
   
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return{
            type:'postgres',
            host:this.configService.get<string>('DB_HOST'),
            port:this.configService.get<number>('DB_PORT'),
            username:this.configService.get<string>('DB_USER'),
            password:this.configService.get<string>('DB_PASSWORD'),
            database:this.configService.get<string>('DB_NAME'),
            entities:[UsersEntity, AdminEntity, WalletsEntity,UsersOtpEntity, AdminsOtpEntity],
            synchronize:true,
            logging:false
        }
    }

}