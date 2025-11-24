// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // small helper if installed, or implement manually
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// If you don't have @nestjs/mapped-types installed, just copy fields with ?.
import  {Role}  from '../../../generated/prisma/client.js';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
  // PartialType already makes all fields optional, but we can add extra constraints if needed
}
