import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Status } from './@types';

export class ILaboratoryDto {
  @IsNotEmpty()
  @ApiProperty()
  nome: string;
  @IsNotEmpty()
  @ApiProperty()
  endereco: string;
  @IsOptional()
  @ApiProperty({
    enum: Status,
    required: false,
  })
  @IsEnum(Status, { message: 'status pode ser apenas ativo ou inativo' })
  status: Status;
}

export class ICreateLaboratoryDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ILaboratoryDto)
  @ApiProperty({
    type: [ILaboratoryDto],
  })
  laboratorio: ILaboratoryDto[];
}
