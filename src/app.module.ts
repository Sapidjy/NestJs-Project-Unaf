import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ProjectModule,
    TaskModule,
    MemberModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
