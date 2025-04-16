import { Migration } from '@mikro-orm/migrations';

export class Migration20250412155031 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" drop column "bio";`);

    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_email_unique";`);

    this.addSql(`alter table "users" add column "bio" text not null default '';`);
  }

}
