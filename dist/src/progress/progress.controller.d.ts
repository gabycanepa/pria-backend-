import { ProgressService } from './progress.service';
import { SaveProgressDto } from './dto/save-progress.dto';
import { ProgressItemDto, UserProgressDto } from './dto/progress-response.dto';
export declare class ProgressController {
    private progressService;
    private readonly logger;
    constructor(progressService: ProgressService);
    saveProgress(user: any, dto: SaveProgressDto): Promise<ProgressItemDto>;
    getUserProgress(user: any): Promise<UserProgressDto>;
}
