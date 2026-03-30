export declare class LeaderboardEntryDto {
    rank: number;
    userId: string;
    playerName: string;
    score: number;
    character: string;
}
export declare class LeaderboardResponseDto {
    entries: LeaderboardEntryDto[];
    currentUserRank?: number | null;
}
