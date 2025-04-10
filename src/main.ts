import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/postgresql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);

  // Check if connected
  if (await orm.isConnected()) {
    console.log('📦 Database connected successfully!');
    console.log(`Connected to: ${orm.config.getClientUrl()}`);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
