import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AdminModule } from './admins/admin.module';
import { WalletModule } from './wallets/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './core/typeorm.factory';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notifications/notification.module';
import { AuthModule } from './auths/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
      }),
      TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
      UserModule, 
      AdminModule,
      WalletModule,
      NotificationModule,
      AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
