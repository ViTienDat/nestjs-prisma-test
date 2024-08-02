import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FilterUserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService:UserService) {}

    @UseGuards(AuthGuard)
    @Get("get-detail")
    getDetail(@Req() req:any) {
        return this.userService.getUserDetail(req)
    }

    @UseGuards( new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Get("get-all")
    getAll(@Query() query: FilterUserDto) {
        return this.userService.getAll(query)
    }
}
