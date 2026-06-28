import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { resolveAuthUserId } from '../_utils/resolve-auth-user-id';
import { CreateNotificationDto } from './_utils/dto/create-notification.dto';
import { UpdateNotificationDto } from './_utils/dto/update-notification.dto';
import { AuthUserPayload } from '../_utils/auth-request';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authUser: AuthUserPayload | undefined) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { sendTime: 'asc' },
    });

    if (notifications.length > 0) {
      return notifications;
    }

    return this.createDefaultNotifications(userId);
  }

  async create(
    authUser: AuthUserPayload | undefined,
    dto: CreateNotificationDto,
  ) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    return this.prisma.notification.create({
      data: {
        userId,
        notificationType: dto.notificationType ?? NotificationType.REMINDER,
        message: dto.message,
        sendTime: dto.sendTime ? new Date(dto.sendTime) : new Date(),
      },
    });
  }

  async update(
    authUser: AuthUserPayload | undefined,
    id: number,
    dto: UpdateNotificationDto,
  ) {
    const userId = await resolveAuthUserId(this.prisma, authUser);

    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    return this.prisma.notification.update({
      where: { id },
      data: {
        notificationType: dto.notificationType,
        message: dto.message,
        sendTime: dto.sendTime ? new Date(dto.sendTime) : undefined,
      },
    });
  }

  private async createDefaultNotifications(userId: number) {
    const now = new Date();

    await this.prisma.notification.createMany({
      data: [
        {
          userId,
          notificationType: NotificationType.REMINDER,
          message: 'Start your day by logging your first meal.',
          sendTime: now,
        },
        {
          userId,
          notificationType: NotificationType.REMINDER,
          message: 'You may need more protein to reach your goal today.',
          sendTime: now,
        },
        {
          userId,
          notificationType: NotificationType.REMINDER,
          message: 'Do not forget to log your dinner.',
          sendTime: now,
        },
      ],
    });

    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { sendTime: 'asc' },
    });
  }
}
