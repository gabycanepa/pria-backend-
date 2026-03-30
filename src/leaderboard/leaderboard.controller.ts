import { Controller, Get, Param, Query, ParseIntPipe, Logger, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardResponseDto } from './dto/leaderboard-response.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('Leaderboard')
@Controller('api/leaderboard')
export class LeaderboardController {
  private readonly logger = new Logger(LeaderboardController.name);

  constructor(private leaderboardService: LeaderboardService) {}

  @Get(':level')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ 
    summary: 'Get leaderboard for a level',
    description: 'Public endpoint. If Bearer token is provided, response includes currentUserRank.'
  })
  @ApiParam({ name: 'level', description: 'Level number (1-3)', type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of entries to return', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Leaderboard entries', type: LeaderboardResponseDto })
  @ApiBearerAuth()
  async getLeaderboard(
    @Param('level', ParseIntPipe) level: number,
    @Query('limit') limit?: string,
    @Req() req?: Request,
  ): Promise<LeaderboardResponseDto> {
    const limitNumber = limit ? parseInt(limit, 10) : 20;
    
    // Extract user from request if authenticated (optional)
    const user = (req as any).user;
    const userId = user?.id;

    this.logger.log(`Leaderboard request for level ${level}, limit ${limitNumber}, user: ${userId || 'anonymous'}`);
    
    return this.leaderboardService.getLeaderboard(level, limitNumber, userId);
  }
}
