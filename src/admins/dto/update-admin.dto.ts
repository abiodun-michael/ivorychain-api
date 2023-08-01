import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class UpdateAdminDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName:string
}