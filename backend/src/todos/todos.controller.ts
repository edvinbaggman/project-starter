import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '../common/interfaces/todo.interface';
import { AdminGuard } from '../firebase/guards/admin.guard';
import { AuthGuard } from '../firebase/guards/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  create(@Param('id') id: string, @Body() todo: Todo): Promise<void> {
    return this.todoService.create(id, todo);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() todo: Partial<Todo>): Promise<void> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
