import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

// Enum pour les rôles d'utilisateur
export enum UserRole {
  USER = 'USER',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

// DTO pour les informations de l'utilisateur
export class UserDto {
  @ApiProperty({
    description: 'Nom d’utilisateur',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Email de l’utilisateur',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Mot de passe de l’utilisateur',
    example: 'secret123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Rôle de l’utilisateur',
    enum: UserRole,
    example: UserRole.USER,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

// DTO pour la création d’utilisateur
export class CreateUserDto {
  @ApiProperty({
    description: 'Nom d’utilisateur',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email de l’utilisateur',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l’utilisateur',
    example: 'secret123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Rôle de l’utilisateur',
    enum: UserRole,
    example: UserRole.USER,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

// DTO pour la mise à jour d’utilisateur
export class UpdateUserDto {
  @ApiProperty({
    description: 'ID de l’utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Nom d’utilisateur',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Email de l’utilisateur',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Mot de passe de l’utilisateur',
    example: 'secret123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Rôle de l’utilisateur',
    enum: UserRole,
    example: UserRole.MEMBER,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

// DTO pour la mise à jour du rôle d’utilisateur
export class UpdateRoleUserDto {
  @ApiProperty({
    description: 'ID de l’utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Nouveau rôle de l’utilisateur',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

// DTO pour la suppression d’utilisateur
export class DeleteUserDto {
  @ApiProperty({
    description: 'ID de l’utilisateur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
