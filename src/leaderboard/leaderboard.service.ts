import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);

  constructor(private prisma: PrismaService) {}

  async getLeaderboard(level: number, limit: number = 20, userId?: string) {
    try {
      // Validate level
      if (level < 1 || level > 3) {
        throw new BadRequestException('Level must be between 1 and 3');
      }

      // Get top scores for this level
      const topScores = await this.prisma.levelprogress.findMany({
        where: {
          level,
          completed: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { bestScore: 'desc' },
          { createdAt: 'asc' }, // Earlier achievement wins for same score
        ],
        take: limit,
      });

      const entries = topScores.map((entry: any, index: number) => ({
        rank: index + 1,
        userId: entry.user.id,
        playerName: entry.user.name,
        score: entry.bestScore,
        character: entry.character,
      }));

      let currentUserRank: number | null = null;

      // If userId provided, find their rank
      if (userId) {
        const userProgress = await this.prisma.levelprogress.findUnique({
          where: {
            userId_level: {
              userId,
              level,
            },
          },
        });

        if (userProgress && userProgress.completed) {
          // Count how many users have better scores or same score but earlier timestamp
          const betterCount = await this.prisma.levelprogress.count({
            where: {
              level,
              completed: true,
              OR: [
                { bestScore: { gt: userProgress.bestScore } },
                {
                  AND: [
                    { bestScore: userProgress.bestScore },
                    { createdAt: { lt: userProgress.createdAt } },
                  ],
                },
              ],
            },
          });

          currentUserRank = betterCount + 1;
        }
      }

      this.logger.log(`Fetched leaderboard for level ${level}, ${entries.length} entries`);

      return {
        entries,
        ...(userId !== undefined && { currentUserRank }),
      };
    } catch (error) {
      this.logger.error(`Error fetching leaderboard: ${error.message}`, error.stack);
      throw error;
    }
  }
}
