import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class IExameDelete {
  @IsNotEmpty()
  @IsMongoId({ message: 'O Id precisa ser válido' })
  @ApiProperty()
  _id: string;
}

export class IDeleteExamDto {
  @Type(() => IExameDelete)
  @ValidateNested({ each: true })
  @IsArray()
  @ApiProperty({
    type: [IExameDelete],
  })
  exame: IExameDelete[];
}
