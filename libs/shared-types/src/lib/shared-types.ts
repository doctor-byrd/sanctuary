import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export function sharedTypes(): string {
  return 'shared-types';
}

//User entity interface
export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRoles;
  resetToken: string | null;
  resetTokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class ForgotPasswordDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;
}

export class ChangeUserRoleDto {
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;
}

export class ResetUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}