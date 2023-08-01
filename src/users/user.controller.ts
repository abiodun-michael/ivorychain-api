import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/core/decorators/roles.decorator";
import { Role } from "src/core/constants";

@ApiTags("Users")
@ApiBearerAuth("jwt")
@Controller("users")
export class UserController{
    constructor(private readonly userService: UserService){}

    @Roles(Role.Admin)
    @Get()
    all(){
        return this.userService.getAll()
    }

    @Roles(Role.Admin)
    @Get(":id")
    getById(@Param("id") id:string){
        return this.userService.getById(id)
    }

    @Roles(Role.Admin)
    @Put(":id")
    update(@Param("id") id:string, @Body() dto: UpdateUserDto){
        return this.userService.updateById(dto, id)
    }
}