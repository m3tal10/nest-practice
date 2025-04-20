import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
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
