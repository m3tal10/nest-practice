import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRepository } from './users.repository';

@Entity({ repository: () => UserRepository, tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ type: 'text' })
  bio = '';

  @Property({ type: 'datetime', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Property({
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;
}
