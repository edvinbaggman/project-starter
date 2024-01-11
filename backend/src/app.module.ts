import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [FirebaseModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
