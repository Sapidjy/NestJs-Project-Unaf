import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  CreateTaskDto,
  DeleteTaskDto,
  TaskDto,
  UpdateTaskDto,
} from 'src/dto/task.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Tâches')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/status/:id')
  @ApiOperation({ summary: "Obtenir le statut d'une tâche" })
  @ApiParam({
    name: 'id',
    description: "L'ID de la tâche pour laquelle obtenir le statut",
  })
  getTaskStatus(@Param('id') taskId: string) {
    return this.taskService.getTaskStatus(taskId);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  readAll() {
    return this.taskService.readTasks();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiParam({ name: 'id', description: "L'ID de la tâche à récupérer" })
  readOne(@Param('id') taskId: string) {
    return this.taskService.readTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Les informations pour créer une nouvelle tâche',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiParam({ name: 'id', description: "L'ID de la tâche à mettre à jour" })
  @ApiBody({
    type: TaskDto,
    description: 'Les nouvelles informations de la tâche',
  })
  update(@Param('id') taskId: string, @Body() taskDto: TaskDto) {
    const updateTaskDto: UpdateTaskDto = { taskId, ...taskDto };
    return this.taskService.updateTask(updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiBody({
    type: DeleteTaskDto,
    description: 'Les informations de la tâche à supprimer',
  })
  delete(@Body() deleteTaskDto: DeleteTaskDto) {
    return this.taskService.deleteTask(deleteTaskDto.taskId);
  }
}
