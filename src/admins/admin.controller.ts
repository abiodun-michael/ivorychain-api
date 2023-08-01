import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Role } from "src/core/constants";
import { Roles } from "src/core/decorators/roles.decorator";

@ApiTags("Admins")
@Controller("admins")
@ApiBearerAuth("jwt")
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    @Roles(Role.Admin)
    @Get()
    all(){
        return this.adminService.getAll()
    }

    @Roles(Role.Admin)
    @Get(":id")
    id(@Param("id") id:string){
        return this.adminService.getById(id)
    }

    @Roles(Role.Admin)
    @Put(":id")
    update(@Param("id") id:string, @Body() dto: UpdateAdminDto){
        return this.adminService.updateById(dto, id)
    }
}