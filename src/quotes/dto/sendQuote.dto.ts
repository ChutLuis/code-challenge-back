import { IsArray, IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  thickness: string;

  @IsNotEmpty()
  @IsString()
  dimensions: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  pricePerUnit: number;

  @IsOptional()
  @IsNumber()
  price:number
}

class AvailableItemDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  thickness: string;

  @IsNotEmpty()
  @IsString()
  dimensions: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  custom_dimensions?: string;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductDto)
  product?: ProductDto;

  @IsNotEmpty()
  @IsBoolean()
  canMeetDeadline: boolean;

  

  @IsOptional()
  @IsEmpty()
  alternatives:number
}

class QuotedItemDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  thickness: string;

  @IsNotEmpty()
  @IsString()
  dimensions: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  custom_dimensions?: string;
}

export class CreateRFQDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailableItemDto)
  available: AvailableItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotedItemDto)
  quoted: QuotedItemDto[];

  @IsNotEmpty()
  @IsString()
  to: string;
}
