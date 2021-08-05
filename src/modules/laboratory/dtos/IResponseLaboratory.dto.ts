import { ApiProperty } from '@nestjs/swagger';

export class IResponseLaboratory {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  endereco: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
