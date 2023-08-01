

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";



export class DepositDto{

    @ApiProperty({required:true, description:"Amount you want to deposit"})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    amount:number
}