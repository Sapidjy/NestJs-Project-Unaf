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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateProjectDto,
  DeleteProjectDto,
  ProjectDto,
  UpdateProjectDto,
} from 'src/dto/project.dto';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Projets')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les projets' })
  readAll() {
    return this.projectService.readProjects();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer un projet par ID' })
  @ApiParam({ name: 'id', description: "L'ID du projet à récupérer" })
  readOne(@Param('id') projectId: string) {
    return this.projectService.readProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiBody({
    type: CreateProjectDto,
    description: 'Les informations pour créer un nouveau projet',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiParam({ name: 'id', description: "L'ID du projet à mettre à jour" })
  @ApiBody({
    type: ProjectDto,
    description: 'Les nouvelles informations du projet',
  })
  async update(@Param('id') projectId: string, @Body() projectDto: ProjectDto) {
    const updateProjectDto: UpdateProjectDto = {
      projectId,
      ...projectDto,
    };
    return await this.projectService.updateProject(updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiBody({
    type: DeleteProjectDto,
    description: 'Les informations du projet à supprimer',
  })
  async delete(@Body() deleteProjectDto: DeleteProjectDto) {
    return await this.projectService.deleteProject(deleteProjectDto.projectId);
  }
}
