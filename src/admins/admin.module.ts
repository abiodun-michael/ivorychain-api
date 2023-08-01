import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminRepository } from "./repositories/admin.repository";
import { AuthModule } from "src/auths/auth.module";
import { AdminOtpRepository } from "./repositories/admin-otp.repository";
import { NotificationModule } from "src/notifications/notification.module";
import { AdminAuthController } from "./auth/admin-auth.controller";
import { AdminAuthService } from "./auth/admin-auth.service";
import { UserModule } from "src/users/user.module";



@Module({
    imports:[AuthModule, NotificationModule, UserModule],
    providers:[AdminService,AdminAuthService, AdminRepository, AdminOtpRepository],
    controllers:[AdminController, AdminAuthController],
    exports:[AdminService]
})
export class AdminModule{}