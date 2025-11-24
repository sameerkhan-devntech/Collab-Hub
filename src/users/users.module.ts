// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaModule } from '../lib/prisma.module.js';
import {PassportModule} from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule,PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
