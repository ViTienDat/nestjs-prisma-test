import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailerService } from './mailersend/mailer.service';

@Module({
  imports: [
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, MailerService]
})
export class AuthModule {}


