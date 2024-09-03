import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  user?: any;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsInt()
  @IsNotEmpty()
  price: number;
  @IsOptional()
  image: any;
  @IsOptional()
  score: number;
}
