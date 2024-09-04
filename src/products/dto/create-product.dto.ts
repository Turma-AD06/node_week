import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  user?: any;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;
  @IsOptional()
  image: any;
  @IsOptional()
  score: number;
}
