import { ApiProperty } from '@nestjs/swagger';
import { Status, Tipo } from './@types';

export class IResponseCreateExam {
  @ApiProperty({
    enum: Status,
  })
  status: string;
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty({
    enum: Tipo,
  })
  tipo: string;
  @ApiProperty()
  createdAt: string;
}

class ILab {
  @ApiProperty()
  status: string;
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  endereco: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}

export class IResponseAddLab {
  @ApiProperty({ enum: Status })
  status: Status;
  @ApiProperty({
    type: [ILab],
  })
  laboratorios: ILab[];
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty({ enum: Tipo })
  tipo: Tipo;
  @ApiProperty()
  createdAt: Tipo;
  @ApiProperty()
  updatedAt: string;
}
