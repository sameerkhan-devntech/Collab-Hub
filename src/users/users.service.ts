// src/users/users.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from '../lib/prisma.service.js';
import { Role } from '@prisma/client';
type User = {
  id: number;
  name: string;
  email: string;
  passwordHash?: string | null;
  role?: Role | null;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check duplicate email
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = this.hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: hashed,
        role: createUserDto.role ?? undefined,
      },
    });

    // optionally remove passwordHash before returning (do not return hashes)
    // Prisma returns passwordHash; hide it from the returned object
    const { passwordHash, ...safe } = user;
    return safe as unknown as User; // keep type but note password removed at runtime
  }

  async findAll(): Promise<User[]> {
    // do not select password
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    }) as Promise<User[]>;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

  
    let hashed: string | undefined = undefined;
    if (updateUserDto.password) {
      hashed = this.hashPassword(updateUserDto.password);
    }
  
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          passwordHash: hashed,
          role: updateUserDto.role ?? undefined,
        },
        select: { id: true, name: true, email: true, role: true },
      });
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw err;
    }
  }
  

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw err;
    }
  }
}
