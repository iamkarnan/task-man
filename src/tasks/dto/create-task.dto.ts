import {IsEnum} from 'class-validator';
import {TaskStatus} from '../schemas/task.schema';


export class CreateTaskDto {
 	title: string;

 	description: string;

 	@IsEnum(TaskStatus, {message: "Status must be pending, in-progress or completed"})
    status: TaskStatus;
}