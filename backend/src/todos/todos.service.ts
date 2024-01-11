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

  async create(id: string): Promise<void> {
    const docData: Todo = {
      stringField: 'Hello world!',
      numberField: 5,
    };
    await this.fb.setDocument('todos', id, docData);
  }

  async update(id: string): Promise<void> {
    const docData: Partial<Todo> = {
      stringField: 'Hello world again!',
    };
    await this.fb.updateDocument('todos', id, docData);
  }

  async delete(id: string): Promise<void> {
    await this.fb.deleteDocument('todos', id);
  }
}
