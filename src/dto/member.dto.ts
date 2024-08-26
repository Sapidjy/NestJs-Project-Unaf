import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectMemberDto {
  @ApiProperty({
    description: "L'ID de l'utilisateur membre du projet",
    example: 'user-id-1234',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "L'ID du projet auquel l'utilisateur est ajouté",
    example: 'project-id-5678',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}

export class TaskMemberDto {
  @ApiProperty({
    description: "L'ID de l'utilisateur membre de la tâche",
    example: 'user-id-1234',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "L'ID de la tâche à laquelle l'utilisateur est assigné",
    example: 'task-id-9012',
  })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({
    description: "L'ID du projet auquel la tâche appartient",
    example: 'project-id-5678',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
