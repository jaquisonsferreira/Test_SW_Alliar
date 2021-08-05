import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Status } from './@types';

export class ILaboratoryUpdate {
  @IsNotEmpty()
  @IsMongoId({ message: 'O Id precisa ser válido' })
  @ApiProperty()
  _id: string;
  @ApiProperty({ required: false })
  nome?: string;
  @ApiProperty({ required: false })
  endereco?: string;
  @IsOptional()
  @IsEnum(Status, { message: 'status pode ser apenas ativo ou inativo' })
  @ApiProperty({ enum: Status, required: false })
  status?: Status;
}

export class IUpdateLaboratoryDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ILaboratoryUpdate)
  @ApiProperty({ type: [ILaboratoryUpdate] })
  laboratorio: ILaboratoryUpdate[];
}
