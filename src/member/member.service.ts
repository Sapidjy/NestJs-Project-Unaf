import { Injectable } from '@nestjs/common';
import { ProjectMemberDto, TaskMemberDto } from 'src/dto/member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMembersProjects() {
    const projectsMembers = await this.prismaService.projectMember.findMany({
      include: { project: true, user: true },
    });
    return projectsMembers.length > 0
      ? projectsMembers
      : { message: 'Aucun projet membre trouvé.' };
  }

  async getMemberProjects(userId: string) {
    const projectsMember = await this.prismaService.projectMember.findMany({
      where: { userId },
      include: { project: true, user: true },
    });

    if (projectsMember.length === 0) {
      return {
        message: `Aucun projet trouvé pour l'utilisateur d'ID ${userId}.`,
      };
    }

    return projectsMember.map((member) => member.project);
  }

  async addMemberProject(projectMemberDto: ProjectMemberDto) {
    const projectMember = await this.prismaService.projectMember.create({
      data: projectMemberDto,
      include: { user: true, project: true },
    });
    return projectMember;
  }

  async removeMemberProject(projectMemberDto: ProjectMemberDto) {
    const { projectId, userId } = projectMemberDto;

    const existingMember = await this.prismaService.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });

    if (!existingMember) {
      return {
        message: `Le membre avec ID ${userId} n'est pas dans le projet ${projectId}.`,
      };
    }

    await this.prismaService.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });

    return {
      message: `Utilisateur d'ID ${userId} retiré du projet d'ID ${projectId} avec succès.`,
    };
  }

  async getMembersTasks() {
    const tasksMembers = await this.prismaService.taskMember.findMany({
      include: { project: true, user: true, task: true },
    });

    return tasksMembers.length > 0
      ? tasksMembers
      : { message: 'Aucune tâche membre trouvée.' };
  }

  async getMemberTasks(userId: string) {
    const taskMembers = await this.prismaService.taskMember.findMany({
      where: { userId },
      include: { project: true, user: true, task: true },
    });

    return taskMembers.length > 0
      ? taskMembers
      : { message: `Aucune tâche trouvée pour l'utilisateur d'ID ${userId}.` };
  }

  async addMemberTask(taskMemberDto: TaskMemberDto) {
    const taskMember = await this.prismaService.taskMember.create({
      data: taskMemberDto,
      include: { project: true, user: true, task: true },
    });
    return taskMember;
  }

  async removeMemberTask(taskMemberDto: TaskMemberDto) {
    const { projectId, userId, taskId } = taskMemberDto;

    const result = await this.prismaService.taskMember.deleteMany({
      where: {
        projectId,
        userId,
        taskId,
      },
    });

    if (result.count === 0) {
      return {
        message: `Aucune tâche d'ID ${taskId} trouvée pour l'utilisateur d'ID ${userId} dans le projet d'ID ${projectId}.`,
      };
    }

    return {
      message: `Tâche d'ID ${taskId} retirée de l'utilisateur d'ID ${userId} dans le projet d'ID ${projectId} avec succès.`,
    };
  }
}
