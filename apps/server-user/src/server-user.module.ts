import { Module } from '@nestjs/common';
import { ServerUserController } from './server-user.controller';
import { ServerUserService } from './server-user.service';

@Module({
  imports: [],
  controllers: [ServerUserController],
  providers: [ServerUserService],
})
export class ServerUserModule {}
