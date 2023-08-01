import { Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/core/guards/auth.guard";

@Module({
    imports:[JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2h' },
      })],
    providers:[PasswordService,{
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
    exports:[PasswordService,JwtModule]
})
export class AuthModule{}