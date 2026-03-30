import { PrismaService } from '../prisma/prisma.service';
import { SaveProgressDto } from './dto/save-progress.dto';
export declare class ProgressService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    saveProgress(userId: string, dto: SaveProgressDto): Promise<{
        id: string;
        level: number;
        score: number;
        completed: boolean;
        character: string;
        bestScore: number;
        updatedAt: string;
    }>;
    getUserProgress(userId: string): Promise<{
        levels: {
            level: any;
            bestScore: any;
            completed: any;
            character: any;
        }[];
    }>;
}
