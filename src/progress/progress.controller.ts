import { Controller, Post, Get, Body, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { SaveProgressDto } from './dto/save-progress.dto';
import { ProgressItemDto, UserProgressDto } from './dto/progress-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Game Progress')
@Controller('api/progress')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProgressController {
  private readonly logger = new Logger(ProgressController.name);

  constructor(private progressService: ProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Save level progress' })
  @ApiResponse({ status: 201, description: 'Progress saved', type: ProgressItemDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async saveProgress(
    @CurrentUser() user: any,
    @Body() dto: SaveProgressDto,
  ): Promise<ProgressItemDto> {
    this.logger.log(`Save progress request from user ${user.id} for level ${dto.level}`);
    return this.progressService.saveProgress(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user progress for all levels' })
  @ApiResponse({ status: 200, description: 'User progress', type: UserProgressDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserProgress(@CurrentUser() user: any): Promise<UserProgressDto> {
    this.logger.log(`Get progress request from user ${user.id}`);
    return this.progressService.getUserProgress(user.id);
  }
}
