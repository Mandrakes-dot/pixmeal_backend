import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Protect } from '../auth/decorators/protect.decorator';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './_utils/dto/create-notification.dto';
import { UpdateNotificationDto } from './_utils/dto/update-notification.dto';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Protect()
  findAll(@Req() req: any) {
    return this.notificationsService.findAll(req.user);
  }

  @Post()
  @Protect()
  create(@Req() req: any, @Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(req.user, dto);
  }

  @Put(':id')
  @Protect()
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(req.user, id, dto);
  }
}