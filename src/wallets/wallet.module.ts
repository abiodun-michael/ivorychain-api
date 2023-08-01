import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletRepository } from "./repositories/wallet.repository";


@Module({
    providers:[WalletService, WalletRepository],
    exports:[WalletService]
})
export class WalletModule{}