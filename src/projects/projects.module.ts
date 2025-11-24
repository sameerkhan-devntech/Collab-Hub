
import { Module } from "@nestjs/common";
import { ProjectController } from "./projects.controller.js";
import { ProjectService } from "./projects.service.js";
import { PrismaModule } from "../lib/prisma.module.js";
@Module({
    imports:[PrismaModule],
    providers:[ProjectService],
    controllers:[ProjectController],
    exports:[ProjectService]
})
export class ProjectsModule{}