import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/postgresql';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  app.useGlobalFilters(new HttpExceptionFilter());
  // Check if connected
  if (await orm.isConnected()) {
    console.log('📦 Database connected successfully!');
    console.log(`Connected to: ${orm.config.getClientUrl()}`);
  }
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT}`);
}
bootstrap();
