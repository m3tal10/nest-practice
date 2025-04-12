import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}
  async getUsers(): Promise<User[]> {
    // throw new HttpException('Conflict', HttpStatus.CONFLICT);
    return this.userRepository.findAll();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }
}
