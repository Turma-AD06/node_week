import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  user_id: number;
  @IsString()
  @IsOptional()
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
