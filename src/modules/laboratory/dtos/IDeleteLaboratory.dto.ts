import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class ILaboratoryDelete {
  @IsNotEmpty()
  @IsMongoId({ message: 'O Id precisa ser válido' })
  @ApiProperty()
  _id: string;
}

export class IDeleteLaboratoryDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ILaboratoryDelete)
  @ApiProperty({ type: [ILaboratoryDelete] })
  laboratorio: ILaboratoryDelete[];
}
