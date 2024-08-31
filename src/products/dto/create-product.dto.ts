import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  user_id: number;
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
