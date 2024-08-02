import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService){}

    async getUserDetail(req:any):Promise<any> {
        const user = req.user_data
        const response = await this.prismaService.user.findUnique({where: {id: user.id}, select: {
            id: true,
            email: true,
            name: true,
            phone: true
        }})
        return response
    }

    async getAll():Promise<any> {
        const response = await this.prismaService.user.findMany({where: {role: {
            not: "admin"
        }}, select: {
            id: true,
            email: true,
            name: true,
            phone: true
        }})
        return response
    }
}
 