import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class InviteAdminDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string


    @ApiProperty()
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password:string
}