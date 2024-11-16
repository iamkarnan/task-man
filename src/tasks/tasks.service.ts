import { Model } from 'mongoose';
import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  create(createTaskDto: CreateTaskDto) {
    const createTask = new this.taskModel(createTaskDto);
    return createTask.save();
  }

  async findAll() {
    const allData = await this.taskModel.find().exec();
    if (allData.length > 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Tasks found',
        total: allData.length,
        data: allData,
      };
    } else {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'No data found',
        data: [],
      };
    }
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Task found',
        data: task,
      };
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
    );
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Task updated successfully',
        data: updatedTask,
      };
    }
  }

  async remove(id: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    } else {
      return {
        statusCode: HttpStatus.OK,
        message: 'Task deleted successfully',
      };
    }
  }
}
