export declare class ProgressItemDto {
    id: string;
    level: number;
    score: number;
    completed: boolean;
    character: string;
    bestScore: number;
    updatedAt: string;
}
export declare class UserProgressDto {
    levels: Array<{
        level: number;
        bestScore: number;
        completed: boolean;
        character: string;
    }>;
}
