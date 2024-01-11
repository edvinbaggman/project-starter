import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { FirebaseController } from './firebase.controller';

@Global()
@Module({
  providers: [AuthGuard, AdminGuard, FirebaseService],
  exports: [AuthGuard, AdminGuard, FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
