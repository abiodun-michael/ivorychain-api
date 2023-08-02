import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { LoginDto } from "src/auths/dto/login.dto";
import { AcceptInviteDto } from "src/auths/dto/accept-invite.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Public } from "src/core/decorators/public.decorator";
import { Roles } from "src/core/decorators/roles.decorator";
import { Role } from "src/core/constants";
import { InviteUserDto } from "../dto/invite-user.dto";

@ApiTags("Users Authentication")
@Controller("users/auths")
@ApiBearerAuth('jwt')
export class UserAuthController{
    constructor(private readonly userAuthService: UserAuthService){}

    @Roles(Role.User)
    @Get("profile")
    profile(@Req() req:any){
        return this.userAuthService.getProfile(req.user.id)
    }

    
    @Roles(Role.Admin)
    @Post('invite')
    invite(@Body() dto:InviteUserDto){
        return this.userAuthService.invite(dto)
    }

    @Public()
    @Post("login")
    login(@Body() dto: LoginDto){
        return this.userAuthService.login(dto.email, dto.password)
    }

    @Public()
    @Put("accept-invite")
    acceptInvite(@Body() dto: AcceptInviteDto){
        this.userAuthService.acceptInvite(dto.email, dto.code)
    }

    @Roles(Role.Admin)
    @Put(":id/status")
    updateStatus(@Param("id") id:string){
        return this.userAuthService.updateStatusById(id)
    }
}