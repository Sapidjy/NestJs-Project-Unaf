import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from 'src/dto/project.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async readProjects() {
    try {
      const projects = await this.prismaService.project.findMany({
        include: {
          members: true,
          tasks: true,
        },
      });

      if (projects.length === 0) {
        return 'Aucun projet trouvé.';
      }

      return projects;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      return 'Erreur lors de la récupération des projets.';
    }
  }

  async readProject(projectId: string) {
    try {
      const project = await this.prismaService.project.findUnique({
        where: { id: projectId },
        include: {
          members: true,
          tasks: true,
        },
      });
      if (!project) {
        return 'Projet non trouvé.';
      }

      return project;
    } catch (error) {
      console.error('Erreur lors de la récupération du projet:', error);
      return 'Erreur lors de la récupération du projet.';
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const existingProject = await this.prismaService.project.findFirst({
        where: { name: createProjectDto.name },
      });

      if (existingProject) {
        return 'Un projet avec ce nom existe déjà.';
      }

      const newProject = await this.prismaService.project.create({
        data: createProjectDto,
        include: {
          members: true,
          tasks: true,
        },
      });

      return newProject;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      return 'Erreur lors de la création du projet.';
    }
  }

  async updateProject(updateProjectDto: UpdateProjectDto) {
    const { projectId, name, description } = updateProjectDto;

    try {
      const project = await this.readProject(projectId);

      if (typeof project === 'string') {
        return project;
      }

      const updatedProject = await this.prismaService.project.update({
        where: { id: projectId },
        data: { name, description },
        include: {
          members: true,
          tasks: true,
        },
      });

      return updatedProject;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      return 'Erreur lors de la mise à jour du projet.';
    }
  }

  async deleteProject(projectId: string) {
    try {
      const project = await this.readProject(projectId);

      if (typeof project === 'string') {
        return project;
      }

      await this.prismaService.project.delete({
        where: { id: projectId },
      });

      return { message: `Projet d'ID ${projectId} supprimé avec succès.` };
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      return 'Erreur lors de la suppression du projet.';
    }
  }
}
