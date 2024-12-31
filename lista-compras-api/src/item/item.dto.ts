import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  quantidade: number;
  
  @IsNotEmpty()
  @IsBoolean()
  comprado: boolean;
}
