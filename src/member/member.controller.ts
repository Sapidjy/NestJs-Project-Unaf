import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ProjectMemberDto, TaskMemberDto } from 'src/dto/member.dto';
import { MemberService } from './member.service';

@ApiTags('Membres')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/projects')
  @ApiOperation({ summary: 'Obtenir tous les membres des projets' })
  async getMembersProjects() {
    return await this.memberService.getMembersProjects();
  }

  @Get('/tasks')
  @ApiOperation({ summary: 'Obtenir tous les membres des tâches' })
  async getMembersTasks() {
    return await this.memberService.getMembersTasks();
  }

  @Get('/projects/:id')
  @ApiOperation({ summary: "Obtenir les projets d'un membre" })
  @ApiParam({
    name: 'id',
    description: "L'ID du membre dont les projets doivent être récupérés",
  })
  async getMemberProjects(@Param('id') userId: string) {
    return await this.memberService.getMemberProjects(userId);
  }

  @Get('/tasks/:id')
  @ApiOperation({ summary: "Obtenir les tâches d'un membre" })
  @ApiParam({
    name: 'id',
    description: "L'ID de la tâche dont les membres doivent être récupérés",
  })
  async getMemberTasks(@Param('id') taskId: string) {
    return await this.memberService.getMemberTasks(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('projects')
  @ApiOperation({ summary: 'Ajouter un membre à un projet' })
  @ApiBody({
    type: ProjectMemberDto,
    description: 'Les informations pour ajouter un membre à un projet',
  })
  async addMemberProject(@Body() projectMemberDto: ProjectMemberDto) {
    return await this.memberService.addMemberProject(projectMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('tasks')
  @ApiOperation({ summary: 'Ajouter un membre à une tâche' })
  @ApiBody({
    type: TaskMemberDto,
    description: 'Les informations pour ajouter un membre à une tâche',
  })
  async addMemberTask(@Body() taskMemberDto: TaskMemberDto) {
    return await this.memberService.addMemberTask(taskMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('projects')
  @ApiOperation({ summary: "Supprimer un membre d'un projet" })
  @ApiBody({
    type: ProjectMemberDto,
    description: "Les informations pour supprimer un membre d'un projet",
  })
  async removeMemberProject(@Body() projectMemberDto: ProjectMemberDto) {
    return await this.memberService.removeMemberProject(projectMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('tasks')
  @ApiOperation({ summary: "Supprimer un membre d'une tâche" })
  @ApiBody({
    type: TaskMemberDto,
    description: "Les informations pour supprimer un membre d'une tâche",
  })
  async removeMemberTask(@Body() taskMemberDto: TaskMemberDto) {
    return await this.memberService.removeMemberTask(taskMemberDto);
  }
}
