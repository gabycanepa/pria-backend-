"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeaderboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeaderboardService = LeaderboardService_1 = class LeaderboardService {
    prisma;
    logger = new common_1.Logger(LeaderboardService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaderboard(level, limit = 20, userId) {
        try {
            if (level < 1 || level > 3) {
                throw new common_1.BadRequestException('Level must be between 1 and 3');
            }
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
                    { createdAt: 'asc' },
                ],
                take: limit,
            });
            const entries = topScores.map((entry, index) => ({
                rank: index + 1,
                userId: entry.user.id,
                playerName: entry.user.name,
                score: entry.bestScore,
                character: entry.character,
            }));
            let currentUserRank = null;
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
        }
        catch (error) {
            this.logger.error(`Error fetching leaderboard: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = LeaderboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map