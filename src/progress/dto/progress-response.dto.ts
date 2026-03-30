import { ApiProperty } from '@nestjs/swagger';

export class ProgressItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  score: number;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  character: string;

  @ApiProperty()
  bestScore: number;

  @ApiProperty()
  updatedAt: string;
}

export class UserProgressDto {
  @ApiProperty({ type: [ProgressItemDto] })
  levels: Array<{
    level: number;
    bestScore: number;
    completed: boolean;
    character: string;
  }>;
}
