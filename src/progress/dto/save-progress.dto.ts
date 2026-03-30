import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsString, Min, Max, IsIn } from 'class-validator';

export class SaveProgressDto {
  @ApiProperty({ example: 1, description: 'Level number (1-3)' })
  @IsInt()
  @Min(1)
  @Max(3)
  level: number;

  @ApiProperty({ example: 8, description: 'Score (0-10)' })
  @IsInt()
  @Min(0)
  @Max(10)
  score: number;

  @ApiProperty({ example: true, description: 'Whether the level was completed' })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({ example: 'gaby', description: 'Character used', enum: ['gaby', 'cami'] })
  @IsString()
  @IsIn(['gaby', 'cami'])
  character: string;
}
