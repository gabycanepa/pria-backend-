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
var ProgressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgressService = ProgressService_1 = class ProgressService {
    prisma;
    logger = new common_1.Logger(ProgressService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveProgress(userId, dto) {
        try {
            const existing = await this.prisma.levelprogress.findUnique({
                where: {
                    userId_level: {
                        userId,
                        level: dto.level,
                    },
                },
            });
            let shouldUpdate = false;
            let updatedData = {};
            if (existing) {
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
                }
                else {
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
            }
            else {
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
        }
        catch (error) {
            this.logger.error(`Error saving progress: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getUserProgress(userId) {
        try {
            const progress = await this.prisma.levelprogress.findMany({
                where: { userId },
                orderBy: { level: 'asc' },
            });
            this.logger.log(`Fetched progress for user ${userId}: ${progress.length} levels`);
            return {
                levels: progress.map((p) => ({
                    level: p.level,
                    bestScore: p.bestScore,
                    completed: p.completed,
                    character: p.character,
                })),
            };
        }
        catch (error) {
            this.logger.error(`Error fetching user progress: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = ProgressService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map