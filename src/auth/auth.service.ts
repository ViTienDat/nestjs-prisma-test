import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(userData: RegisterDto):Promise<User> {
        const user = await this.prismaService.user.findUnique({where: {email: userData.email}})

        if(user) {
            throw new HttpException('Email has been use', HttpStatus.BAD_REQUEST)
        }

        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hash(userData.password, salt );

        return await this.prismaService.user.create({
            data: {...userData, password: hash}
        })
    }

    async login (loginData: LoginDto):Promise<any> {
        const user = await this.prismaService.user.findUnique({where: {email:loginData.email}})

        if(!user) {
            throw new HttpException('Email is not Exist', HttpStatus.BAD_GATEWAY)
        }

        const checkPassword = await bcrypt.compare( loginData.password ,user.password)

        if(!checkPassword) {
            throw new HttpException('Password is not correct', HttpStatus.BAD_GATEWAY)
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: "15m", 
            secret: process.env.JWT_SECRET_KEY
        })

        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: "7d", 
            secret: process.env.JWT_SECRET_KEY
        })
        return {
            access_token,
            refresh_token
        }
    }

    async refreshToken (token:any):Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_KEY})
            const {iat, exp, ...user} = payload
            const access_token = await this.jwtService.signAsync(user, {
                expiresIn: "15m", 
                secret: process.env.JWT_SECRET_KEY
            })
            console.log(access_token)
        return {
            access_token: access_token
        }
        } catch (error) {
            throw new HttpException({
                status: 419,
                message: 'Token expired'
            }, 419)
        }
    }
}
