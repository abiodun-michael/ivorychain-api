import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";


export class TransferDto{

    @ApiProperty({required:true})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    amount:number

    @ApiProperty({required:true})
    @IsEmail()
    @IsNotEmpty()
    receiverEmail:string
}