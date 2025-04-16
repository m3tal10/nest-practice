import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository extends EntityRepository<User> {
  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.create(data);
    await this.em.persistAndFlush(user);
    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.findOneOrFail({ email });
  }
}
