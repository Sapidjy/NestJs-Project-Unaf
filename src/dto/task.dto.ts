import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';

// Enum pour les statuts de tâche
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

// DTO pour la création de tâche
export class CreateTaskDto {
  @ApiProperty({
    description: 'Nom de la tâche',
    example: 'Faire le ménage',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description de la tâche',
    example: 'Nettoyer toute la maison',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID du créateur de la tâche',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({
    description: 'ID du projet auquel la tâche est assignée',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Statut de la tâche',
    enum: TaskStatus,
    example: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

// DTO pour la mise à jour de tâche
export class UpdateTaskDto {
  @ApiProperty({
    description: 'ID de la tâche',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({
    description: 'Nom de la tâche',
    example: 'Faire le ménage',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description de la tâche',
    example: 'Nettoyer toute la maison',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID du projet auquel la tâche est assignée',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiProperty({
    description: 'Statut de la tâche',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

// DTO pour la suppression de tâche
export class DeleteTaskDto {
  @ApiProperty({
    description: 'ID de la tâche',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  taskId: string;
}

// DTO pour les informations de tâche
export class TaskDto {
  @ApiProperty({
    description: 'Nom de la tâche',
    example: 'Faire le ménage',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description de la tâche',
    example: 'Nettoyer toute la maison',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID du projet auquel la tâche est assignée',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiProperty({
    description: 'Statut de la tâche',
    enum: TaskStatus,
    example: TaskStatus.FINISHED,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
