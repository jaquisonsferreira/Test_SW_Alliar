import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class IAddLabDto {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({
    each: true,
    message: 'Cada valor do laboratório, precisa ser um id válido',
  })
  @ApiProperty()
  loboratorios: [string];
}
