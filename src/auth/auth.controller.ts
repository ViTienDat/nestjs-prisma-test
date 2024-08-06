import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Login2faDto } from './dtos/login-2fa.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/register')
    register(@Body() register: RegisterDto):Promise<User> {
        return this.authService.register(register)
    }

    @Post('/login')
    login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData)
    }

    @Post('/api/users/login-2fa')
    login2fa(@Body() loginData: Login2faDto) {
        return this.authService.login2fa(loginData)
    }

    @Post('/refresh-token')
    refreshToken(@Body() token:any) {
        return this.authService.refreshToken(token.refresh_token)
    }
}
