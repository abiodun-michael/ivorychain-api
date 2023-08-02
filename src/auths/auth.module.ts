import { Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/core/guards/auth.guard";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports:[JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('JWT_SECRET')
          };
        },
        inject:[ConfigService]
      })],
    providers:[PasswordService,{
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
    exports:[PasswordService,JwtModule]
})
export class AuthModule{}