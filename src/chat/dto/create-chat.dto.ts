import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @Type(()=>Number)
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @Type(()=>Number)
  @IsNotEmpty()
  @IsInt()
  roomId!: number;

  @Type(()=>Number)
  @IsNotEmpty()
  @IsInt()
  projectId!: number;
}
