import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserAuthService } from "./auth/user-auth.service";
import { UserOtpRepository } from "./repositories/user-otp.repository";
import { NotificationModule } from "src/notifications/notification.module";
import { AuthModule } from "src/auths/auth.module";
import { UserLocalStrategy } from "src/auths/strategy/user.local.strategy";
import { UserAuthController } from "./auth/user-auth.controller";
import { WalletModule } from "src/wallets/wallet.module";
import { UserWalletController } from "./user-wallet.controller";


@Module({
    imports:[NotificationModule, AuthModule, WalletModule],
    providers:[UserService, UserRepository, UserAuthService, UserOtpRepository, UserLocalStrategy],
    controllers:[UserController,UserAuthController, UserWalletController],
    exports:[UserService,UserAuthService]
})
export class UserModule{}