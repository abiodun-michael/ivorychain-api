import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";



export class UpdateUserDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName:string

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber:string
}