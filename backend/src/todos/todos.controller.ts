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
import { AdminGuard } from '../firebase/guards/admin.guard';
import { AuthGuard } from '../firebase/guards/auth.guard';
import { Todo } from './models/todo.interface';
import { YupValidation } from '../common/utils/yup-validation.pipe';
import { todoCreateSchema, todoUpdateSchema } from './models/todo.validation';

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
  create(
    @Param('id') id: string,
    @Body(new YupValidation(todoCreateSchema)) todo: Todo,
  ): Promise<void> {
    return this.todoService.create(id, todo);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(new YupValidation(todoUpdateSchema)) todo: Partial<Todo>,
  ): Promise<void> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
