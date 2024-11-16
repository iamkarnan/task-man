import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const createdData = await this.tasksService.create(createTaskDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task was created successfully',
      data: createdData,
    };
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Please enter a valid ID');
    }
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Please enter a valid ID');
    }
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Please enter a valid ID');
    }
    await this.tasksService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Task deleted successfully',
    };
  }
}
