import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './app/common/interceptors/transform.interceptor';
import { RolesGuard } from './app/common/guards/roles.guard';
import { UsersModule } from './app/modules/users/users.module';
import { AuthModule } from './app/modules/auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
