import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { WalletService } from "src/wallets/wallet.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DepositDto } from "src/wallets/dto/deposit.dto";
import { Roles } from "src/core/decorators/roles.decorator";
import { Role } from "src/core/constants";
import { TransferDto } from "src/wallets/dto/transfer.dto";
import { UserService } from "./user.service";

@ApiTags("Wallets")
@Controller("users/wallets")
@ApiBearerAuth('jwt')
export class UserWalletController{
    constructor(private readonly walletService: WalletService,
        private readonly userService: UserService){}

    @Roles(Role.Admin)
    @Get()
    getAll(){
        return this.walletService.getAll()
    }

    @Roles(Role.User)
    @Get('me')
    myWallet(@Req() req:any){
        return this.walletService.getByUserId(req.user.id)
    }


    @Roles(Role.User)
    @Post("transfer")
    async transfer(@Body() dto: TransferDto, @Req() req:any){

        const user = await this.userService.getUserByEmail(dto.receiverEmail)
        return this.walletService.transfer(dto.amount, user.id, req.user.id)
    }

    @Roles(Role.User)
    @Post("deposit")
    deposit(@Body() dto: DepositDto, @Req() req:any){
        return this.walletService.deposit(dto.amount, req.user.id)
    }

    @Roles(Role.User)
    @Post("withdraw")
    withdraw(@Body() dto: DepositDto, @Req() req:any){
        return this.walletService.withdraw(dto.amount, req.user.id)
    }
    
}