import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FilterUserDto, UpdateUserByAdminDto } from './dtos/user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {

    constructor(private userService:UserService) {}

    @UseGuards(AuthGuard)
    @Get("/api/user/:id")
    getDetail(@Param('id') id:string) {
        return this.userService.getUserDetail(Number(id))
    }

    @UseGuards( new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Get("get-all")
    getAll(@Query() query: FilterUserDto) {
        return this.userService.getAll(query)
    }

    @Post('/api/users/enable-2fa')
    Enable2fa() {

    }


    // Api admin

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Put('/api/admin/users/:id')
    updateUserByAdmin(@Param('id') id:string, @Body() userData: UpdateUserByAdminDto):Promise<User> {
        return this.userService.updateUserByAdmin(Number(id), userData)
    }

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Delete('/api/admin/users/:id')
    deleteUserByAdmin(@Param('id') id:string):Promise<User> {
        return this.userService.deleteUserByAdmin(Number(id))
    }

    @UseGuards(new RoleGuard(["admin"]))
    @UseGuards(AuthGuard)
    @Get('/api/admin/users/search')
    getUserByAdmin(@Query() query: FilterUserDto){
        return this.userService.getUserByAdmin(query)
    }

}
