import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";


export class TransferDto{

    @ApiProperty({required:true})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    amount:number

    @ApiProperty({required:true})
    @IsUUID()
    @IsNotEmpty()
    receiverWalletId:string
}