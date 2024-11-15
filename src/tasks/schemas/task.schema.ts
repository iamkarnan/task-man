import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in-progress',
	COMPLETED = 'completed'
}

@Schema()
export class Task{
	@Prop({required: true})
	title: string;

	@Prop()
	description: string;

	@Prop({enum: TaskStatus, default: TaskStatus.PENDING})
	status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);