import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meals/meals.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MediasModule } from './minio/medias.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MealsModule, UsersModule, MediasModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
