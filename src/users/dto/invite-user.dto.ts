import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class InviteUserDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password:string
}