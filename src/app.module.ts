import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meals/meals.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MediasModule } from './minio/medias.module';
import { AuthModule } from './auth/auth.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MealsModule,
    UsersModule,
    MediasModule,
    AuthModule,
    AchievementsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
