import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTaskStatus(taskId: string): Promise<string> {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id: taskId },
        select: { status: true },
      });

      if (!task) {
        return 'Tâche non trouvée.';
      }

      return task.status;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du statut de la tâche:',
        error,
      );
      return 'Erreur lors de la récupération du statut de la tâche.';
    }
  }

  async readTasks() {
    try {
      const tasks = await this.prismaService.task.findMany({
        include: {
          project: true,
          creator: true,
        },
      });

      if (tasks.length === 0) {
        return { message: 'Aucune tâche trouvée.' };
      }

      return tasks;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      return 'Erreur lors de la récupération des tâches.';
    }
  }

  async readTask(taskId: string) {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id: taskId },
        include: {
          creator: true,
          project: true,
        },
      });

      if (!task) {
        return { message: 'Tâche non trouvée.' };
      }

      return task;
    } catch (error) {
      console.error('Erreur lors de la récupération de la tâche:', error);
      return 'Erreur lors de la récupération de la tâche.';
    }
  }

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.prismaService.task.create({
        data: createTaskDto,
        include: {
          creator: true,
          project: true,
        },
      });

      return newTask;
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      return 'Erreur lors de la création de la tâche.';
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {
    const { taskId, name, description, projectId, status } = updateTaskDto;

    try {
      const task = await this.readTask(taskId);

      if (typeof task === 'string') {
        return task;
      }

      const updatedTask = await this.prismaService.task.update({
        where: { id: taskId },
        data: { name, description, projectId, status },
        include: {
          creator: true,
          project: true,
        },
      });

      return updatedTask;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      return 'Erreur lors de la mise à jour de la tâche.';
    }
  }

  async deleteTask(taskId: string) {
    try {
      const task = await this.readTask(taskId);

      if (typeof task === 'string') {
        return task;
      }

      await this.prismaService.task.delete({
        where: { id: taskId },
      });

      return { message: `Tâche d'ID ${taskId} supprimée avec succès.` };
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      return 'Erreur lors de la suppression de la tâche.';
    }
  }
}
