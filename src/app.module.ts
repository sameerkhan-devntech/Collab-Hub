import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { UsersModule } from './users/users.module.js';
import { AppService } from './app.service.js';
import {ProjectsModule} from './projects/projects.module.js'
import { FilesModule } from './files/files.module.js';
import { ProjectAssignmentModule } from './projectAssignments/projectAssignments.module.js';
import { TaskModule } from './tasks/tasks.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ChatModule } from './chat/chat.module.js';
import { NotificationModule } from './notification/notification.module.js';

@Module({
  imports: [ UsersModule,ProjectsModule,FilesModule,ProjectAssignmentModule,TaskModule, AuthModule, ChatModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
