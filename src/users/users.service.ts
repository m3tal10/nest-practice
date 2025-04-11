import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}
  async getUsers(): Promise<User[]> {
    throw new HttpException('Conflict', HttpStatus.CONFLICT);
    return this.userRepository.findAll();
  }
  createUser(): string {
    return 'User created';
  }
}
