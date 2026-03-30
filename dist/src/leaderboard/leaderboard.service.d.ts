import { PrismaService } from '../prisma/prisma.service';
export declare class LeaderboardService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getLeaderboard(level: number, limit?: number, userId?: string): Promise<{
        currentUserRank?: number | null | undefined;
        entries: {
            rank: number;
            userId: any;
            playerName: any;
            score: any;
            character: any;
        }[];
    }>;
}
