import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    console.log('Fetching all users');
    return 'All users';
  }
  createUser(): string {
    return 'User created';
  }
}
