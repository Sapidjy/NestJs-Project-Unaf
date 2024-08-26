import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectService, PrismaService],
  controllers: [ProjectController],
})
export class ProjectModule {}
