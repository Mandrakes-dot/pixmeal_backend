import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  notificationType?: NotificationType;
  message: string;
  sendTime?: string;
}