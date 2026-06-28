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
import { HealthController } from './health.controller';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MealsModule,
    UsersModule,
    MediasModule,
    AuthModule,
    AchievementsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UsersController, HealthController],
  providers: [AppService],
})
export class AppModule {}
