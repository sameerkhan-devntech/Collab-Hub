
import { Module } from "@nestjs/common";
import { FileController } from "./files.controller.js";
import { FileService } from "./files.service.js";
import { PrismaModule } from "../lib/prisma.module.js";
import { join } from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
    imports:[PrismaModule,ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'uploads'),
        serveRoot: '/uploads',
      })],
    providers:[FileService],
    controllers:[FileController],
    exports:[FileService]
})
export class FilesModule{}