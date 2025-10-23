import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsBoolean,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  priceMax?: number;

  @IsOptional()
  @IsString()
  orderBy?: 'createdAt' | 'name' | 'price';

  @IsOptional()
  @IsString()
  orderDir?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeDeleted?: boolean = false;
}
