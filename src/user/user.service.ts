import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FilterUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserDetail(req: any): Promise<any> {
    const user = req.user_data;
    const response = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });
    return response;
  }

  async getAll(query: FilterUserDto): Promise<any> {
    const page = Number(query.page) || 1;
    const item_in_page = Number(query.item_page) || 10;
    const search = query.search || '';

    const response = await this.prismaService.user.findMany({
      where: {
        role: {
          not: 'admin',
        },
        OR: [
          {
            email: {
              startsWith: `%${search}%`,
            },
          },
          {
            name: {
              startsWith: `%${search}%`,
            },
          },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
      skip: (page - 1) * item_in_page,
      take: item_in_page,
      orderBy: {
        id: 'asc'
      }
    });
    return response;
  }
}
