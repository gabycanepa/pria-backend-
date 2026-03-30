import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveProgressDto } from './dto/save-progress.dto';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(private prisma: PrismaService) { }

  async saveProgress(userId: string, dto: SaveProgressDto) {
    try {
      // Find existing progress for this user and level
      const existing = await this.prisma.levelprogress.findUnique({
        where: {
          userId_level: {
            userId,
            level: dto.level,
          },
        },
      });

      let shouldUpdate = false;
      let updatedData: any = {};

      if (existing) {
        // Update only if new score > existing bestScore OR completed changes from false to true
        if (dto.score > existing.bestScore) {
          shouldUpdate = true;
          updatedData.bestScore = dto.score;
          updatedData.character = dto.character;
        }

        if (dto.completed && !existing.completed) {
          shouldUpdate = true;
          updatedData.completed = true;
        }

        if (shouldUpdate) {
          const updated = await this.prisma.levelprogress.update({
            where: {
              userId_level: {
                userId,
                level: dto.level,
              },
            },
            data: updatedData,
          });

          this.logger.log(`Progress updated for user ${userId}, level ${dto.level}`);

          return {
            id: updated.id,
            level: updated.level,
            score: dto.score,
            completed: updated.completed,
            character: updated.character,
            bestScore: updated.bestScore,
            updatedAt: updated.updatedAt.toISOString(),
          };
        } else {
          // No update needed, return existing
          this.logger.log(`No update needed for user ${userId}, level ${dto.level}`);
          return {
            id: existing.id,
            level: existing.level,
            score: dto.score,
            completed: existing.completed,
            character: existing.character,
            bestScore: existing.bestScore,
            updatedAt: existing.updatedAt.toISOString(),
          };
        }
      } else {
        // Create new progress record
        const created = await this.prisma.levelprogress.create({
          data: {
            userId,
            level: dto.level,
            bestScore: dto.score,
            completed: dto.completed,
            character: dto.character,
          },
        });

        this.logger.log(`Progress created for user ${userId}, level ${dto.level}`);

        return {
          id: created.id,
          level: created.level,
          score: dto.score,
          completed: created.completed,
          character: created.character,
          bestScore: created.bestScore,
          updatedAt: created.updatedAt.toISOString(),
        };
      }
    } catch (error) {
      this.logger.error(`Error saving progress: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUserProgress(userId: string) {
    try {
      const progress = await this.prisma.levelprogress.findMany({
        where: { userId },
        orderBy: { level: 'asc' },
      });

      this.logger.log(`Fetched progress for user ${userId}: ${progress.length} levels`);

      return {
        levels: progress.map((p: any) => ({
          level: p.level,
          bestScore: p.bestScore,
          completed: p.completed,
          character: p.character,
        })),
      };
    } catch (error) {
      this.logger.error(`Error fetching user progress: ${error.message}`, error.stack);
      throw error;
    }
  }
}
