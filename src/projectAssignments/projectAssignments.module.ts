
import { Module } from "@nestjs/common";
import { PrismaModule } from "../lib/prisma.module.js";
import { ProjectAssignmentsService } from "./projectAssignments.service.js";
import { ProjectAssignmentsController } from "./projectAssignments.controller.js";
@Module({
    imports:[PrismaModule],
    providers:[ProjectAssignmentsService],
    controllers:[ProjectAssignmentsController],
    exports:[ProjectAssignmentsService]
})
export class ProjectAssignmentModule{}