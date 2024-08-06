import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FilterUserDto, UpdateUserByAdminDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserDetail(id: number): Promise<any> {
    const response = await this.prismaService.user.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        username: true,
        email: true,
        full_name: true,
        avatar_url: true,
        role: true,
        is_2fa: true,
        created_at: true,
      },
    });
    return response;
  }

  async getAll(query: FilterUserDto): Promise<any> {
    const page = Number(query.page) || 1;
    const item_in_page = Number(query.item_page) || 10;
    const search = query.search || '';

    const [users, count] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
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
              username: {
                startsWith: `%${search}%`,
              },
            },
          ],
        },
        select: {
          user_id: true,
          username: true,
          email: true,
          full_name: true,
          avatar_url: true,
          role: true,
          google_id: true,
          facebook_id: true,
          is_2fa: true,
          created_at: true,
          updated_at: true
        },
        skip: (page - 1) * item_in_page,
        take: item_in_page,
        orderBy: {
          user_id: 'asc',
        },
      }),
      this.prismaService.user.count({
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
              username: {
                startsWith: `%${search}%`,
              },
            },
          ],
        },
      }),
    ]);

    return {
      users,
      count,
    };
  }


// Admin
  async updateUserByAdmin(id: number, data: UpdateUserByAdminDto):Promise<User> {
    const response = await this.prismaService.user.update({
      where: {user_id: id},
      data: data
    })

    return response
  }

  async deleteUserByAdmin(id: number):Promise<User> {
    const response = await this.prismaService.user.delete({
      where: {user_id: id}
    })

    return response
  }

  async getUserByAdmin(query: FilterUserDto): Promise<any> {
    const page = Number(query.page) || 1;
    const item_in_page = Number(query.item_page) || 10;
    const search = query.search || '';

    const [users, count] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
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
              username: {
                startsWith: `%${search}%`,
              },
            },
          ],
        },
        select: {
          user_id: true,
          username: true,
          email: true,
          full_name: true,
          avatar_url: true,
          role: true,
          google_id: true,
          facebook_id: true,
          is_2fa: true,
          is_verify: true,
          created_at: true,
          updated_at: true
        },
        skip: (page - 1) * item_in_page,
        take: item_in_page,
        orderBy: {
          user_id: 'asc',
        },
      }),
      this.prismaService.user.count({
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
              username: {
                startsWith: `%${search}%`,
              },
            },
          ],
        },
      }),
    ]);

    return {
      users,
      count,
    };
  }
}
