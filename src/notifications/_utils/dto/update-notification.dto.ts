import { NotificationType } from '@prisma/client';

export class UpdateNotificationDto {
  notificationType?: NotificationType;
  message?: string;
  sendTime?: string;
}