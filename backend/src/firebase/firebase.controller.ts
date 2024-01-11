import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AdminGuard } from './guards/admin.guard';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Patch('setAdmin/:email')
  @UseGuards(AdminGuard)
  update(@Param('email') email: string): Promise<void> {
    return this.firebaseService.setUserRole(email, 'admin');
  }
}
