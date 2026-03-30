import { LeaderboardService } from './leaderboard.service';
import { LeaderboardResponseDto } from './dto/leaderboard-response.dto';
import type { Request } from 'express';
export declare class LeaderboardController {
    private leaderboardService;
    private readonly logger;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(level: number, limit?: string, req?: Request): Promise<LeaderboardResponseDto>;
}
