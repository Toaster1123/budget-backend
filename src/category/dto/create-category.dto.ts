import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  user?: User;
}
