import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Protect } from '../auth/decorators/protect.decorator';
import { AuthenticatedRequest } from '../_utils/auth-request';
import { CreateMealEntryDto } from './dto/create-meal-entry.dto';
import { UpdateMealEntryDto } from './dto/update-meal-entry.dto';
import { MealEntriesService } from './mealentries.service';

@Controller('meal-entries')
export class MealEntriesController {
  constructor(private readonly mealEntriesService: MealEntriesService) {}

  @Get()
  @Protect()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.mealEntriesService.findAll(req.user);
  }

  @Get(':id')
  @Protect()
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.mealEntriesService.findOne(req.user, id);
  }

  @Post()
  @Protect()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateMealEntryDto) {
    return this.mealEntriesService.create(req.user, dto);
  }

  @Put(':id')
  @Protect()
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMealEntryDto,
  ) {
    return this.mealEntriesService.update(req.user, id, dto);
  }

  @Delete(':id')
  @Protect()
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.mealEntriesService.remove(req.user, id);
  }
}
