import { IsEnum, IsString, Length } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @Length(10, 200)
  title: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status must be pending, in-progress, or completed',
  })
  status: TaskStatus;
}
