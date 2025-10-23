import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsBoolean,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  priceMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  priceMax?: number;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'price'] })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'name', 'price'])
  orderBy?: 'createdAt' | 'name' | 'price';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderDir?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeDeleted?: boolean = false;
}
