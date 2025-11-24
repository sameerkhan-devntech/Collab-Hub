import { Module } from "@nestjs/common";
import { TaskController } from "./tasks.controller.js";
import { TaskService } from "./tasks.service.js";
import { PrismaModule } from "../lib/prisma.module.js";
@Module({
    imports:[PrismaModule],
    controllers:[TaskController],
    providers:[TaskService],
    exports:[TaskService]
})
export class TaskModule{}