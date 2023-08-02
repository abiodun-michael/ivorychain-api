

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { LoginDto } from "src/auths/dto/login.dto";
import { AcceptInviteDto } from "src/auths/dto/accept-invite.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminAuthService } from "./admin-auth.service";
import { InviteAdminDto } from "../dto/invite-admin.dto";
import { Public } from "src/core/decorators/public.decorator";
import { Roles } from "src/core/decorators/roles.decorator";
import { Role } from "src/core/constants";

@ApiBearerAuth("jwt")
@ApiTags("Admins")
@Controller("admins/auths")
export class AdminAuthController{
    constructor(private readonly adminAuthService: AdminAuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() dto: LoginDto){
        return this.adminAuthService.login(dto.email, dto.password)
    }

    @Public()
    @Post("superadmin")
    inviteSuper(@Body() dto: InviteAdminDto){
        return this.adminAuthService.invite(dto)
    }

    @Roles(Role.Admin)
    @Post('invite')
    inviteAdmin(@Body() dto: InviteAdminDto){
        return this.adminAuthService.invite(dto)
    }

    @Public()
    @Put("accept-invite")
    acceptInvite(@Body() dto: AcceptInviteDto){
        this.adminAuthService.acceptInvite(dto.email, dto.code)
    }


    @Roles(Role.Admin)
    @Get("profile")
    profile(@Req() req:any){
        return this.adminAuthService.getProfile(req.user.id)
    }

    @Roles(Role.Admin)
    @Put(":id/status")
    updateStatus(@Param("id") id:string){
        return this.adminAuthService.updateStatusById(id)
    }
}