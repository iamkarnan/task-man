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
import {ValidateObjectID} from '../pipes/validate-object-id.pipe'
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
  findOne(@Param('id', ValidateObjectID) id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ValidateObjectID) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectID) id: string) {
    await this.tasksService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Task deleted successfully',
    };
  }
}
