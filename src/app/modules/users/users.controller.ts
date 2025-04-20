import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/app/common/pipes/zod-validation.pipe';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { SetMessage } from 'src/app/common/decorators/set-message.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @SetMessage('Users retrieved successfully.')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.usersService.getUsers();
  }
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
