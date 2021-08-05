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
import { Status, Tipo } from './@types';

export class IExameUpdate {
  @IsNotEmpty()
  @IsMongoId({ message: 'O Id precisa ser válido' })
  @ApiProperty({ required: true })
  _id: string;
  @ApiProperty()
  nome: string;
  @IsOptional()
  @IsEnum(Tipo)
  @ApiProperty({ enum: Tipo })
  tipo: Tipo;
  @IsOptional()
  @IsEnum(Status, { message: 'status pode ser apenas ativo ou inativo' })
  @ApiProperty({ enum: Status })
  status: Status;
}

export class IUpdateExamDto {
  @Type(() => IExameUpdate)
  @ValidateNested({ each: true })
  @IsArray()
  @ApiProperty({ type: IExameUpdate })
  exame: IExameUpdate[];
}
