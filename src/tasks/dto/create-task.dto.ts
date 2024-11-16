import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status must be pending, in-progress, or completed',
  })
  status: TaskStatus;
}
