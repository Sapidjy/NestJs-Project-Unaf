import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// DTO pour la création de projet
export class CreateProjectDto {
  @ApiProperty({
    description: 'Nom du projet',
    example: 'Mon Projet',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description du projet',
    example: 'Une description détaillée du projet',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID du propriétaire du projet',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

// DTO pour la mise à jour de projet
export class UpdateProjectDto {
  @ApiProperty({
    description: 'ID du projet',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Nom du projet',
    example: 'Mon Projet Mis à Jour',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description du projet',
    example: 'Une description mise à jour du projet',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

// DTO pour la suppression de projet
export class DeleteProjectDto {
  @ApiProperty({
    description: 'ID du projet',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}

// DTO pour les informations du projet
export class ProjectDto {
  @ApiProperty({
    description: 'Nom du projet',
    example: 'Mon Projet',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description du projet',
    example: 'Une description détaillée du projet',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
