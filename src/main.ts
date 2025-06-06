import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/postgresql';
import { GlobalExceptionFilter } from './app/common/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('example')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useGlobalInterceptors(new TransformInterceptor());
  // Check if connected
  if (await orm.isConnected()) {
    console.log('📦 Database connected successfully!');
    console.log(`Connected to: ${orm.config.getClientUrl()}`);
  }
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT}`);
}
bootstrap();
