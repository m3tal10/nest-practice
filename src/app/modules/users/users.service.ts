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
    return this.userRepository.findAll();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createUser(createUserDto);
    return user;
  }
  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}
