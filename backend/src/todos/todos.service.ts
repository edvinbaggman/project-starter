import { Injectable } from '@nestjs/common';
import { Todo } from '../common/interfaces/todo.interface';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class TodosService {
  constructor(private readonly fb: FirebaseService) {}

  async findOne(id: string): Promise<Todo> {
    return (await this.fb.getDocument('todos', id)) as Todo;
  }

  async findAll(): Promise<Todo[]> {
    return (await this.fb.getAllDocuments('todos')) as Todo[];
  }

  async create(id: string, todo: Todo): Promise<void> {
    todo.id = id;
    await this.fb.setDocument('todos', id, todo);
  }

  async update(id: string, todo: Partial<Todo>): Promise<void> {
    await this.fb.updateDocument('todos', id, todo);
  }

  async delete(id: string): Promise<void> {
    await this.fb.deleteDocument('todos', id);
  }
}
