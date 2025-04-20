import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRepository } from './users.repository';
import { User } from './entities/users.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
