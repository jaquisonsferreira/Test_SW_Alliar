import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Status, Tipo } from './@types';

export class IExam {
  @IsNotEmpty({ message: 'nome näo pode ser vazio' })
  @ApiProperty()
  nome: string;
  @IsEnum(Tipo, { message: 'tipo pode ser apenas analise clinica ou imagem' })
  @IsNotEmpty({ message: 'tipo näo pode ser vazio' })
  @ApiProperty({
    enum: Tipo,
  })
  tipo: Tipo;
  @IsOptional()
  @IsEnum(Status, { message: 'status pode ser apenas ativo ou inativo' })
  @ApiProperty({ enum: Status, required: false })
  status: Status;
}

export class ICreateExamDto {
  @Type(() => IExam)
  @ValidateNested({ each: true })
  @IsArray({ message: 'exame precisa ser um array de exames' })
  @ApiProperty({ type: [IExam] })
  exame: IExam[];
}
