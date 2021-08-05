import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IAddLabDto } from 'src/modules/dtos/IAddLab.dto';
import { ICreateExamDto } from 'src/modules/dtos/ICreateExam.dto';
import { IDeleteExamDto } from 'src/modules/dtos/IDeleteExam.dto';
import {
  IResponseCreateExam,
  IResponseAddLab,
} from 'src/modules/dtos/IResponseExame.dto';

import { IUpdateExamDto } from 'src/modules/dtos/IUpdateExam.dto';
import { ExamService } from '../../services/exam.service';

class ISearch {
  @ApiProperty()
  @IsNotEmpty({ message: 'Parametro nome é obrigatório' })
  nome: string;
}

class IExameId {
  @ApiProperty()
  @IsMongoId({ message: 'Id do exame inválido' })
  @IsNotEmpty()
  exameId: string;
}

@ApiTags('Exames')
@Controller('exame')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Get()
  async list() {
    const exams = await this.examService.list();
    return exams;
  }

  @Get('search')
  async search(@Query() { nome }: ISearch) {
    const exams = await this.examService.findByName(nome);
    return exams;
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: [IResponseCreateExam],
    description: 'Exame criado com sucesso',
  })
  async create(@Body() data: ICreateExamDto) {
    const exam = await this.examService.create(data);
    return exam;
  }

  @Put()
  @HttpCode(200)
  @ApiResponse({
    status: 201,
  })
  async update(@Body() data: IUpdateExamDto) {
    await this.examService.update(data);
  }

  @Delete()
  @HttpCode(200)
  @ApiResponse({
    status: 201,
  })
  async delete(@Body() data: IDeleteExamDto) {
    await this.examService.remove(data);
  }

  @Put('add/laboratorio/:exameId')
  @ApiResponse({
    status: 201,
    type: IResponseAddLab,
  })
  async addLab(@Param() { exameId }: IExameId, @Body() data: IAddLabDto) {
    if (!exameId) {
      throw new HttpException('Id não informado', HttpStatus.BAD_REQUEST);
    }

    const exam = await this.examService.addLab(exameId, data);
    return exam;
  }

  @Put('remove/laboratorio/:exameId')
  @ApiResponse({
    status: 201,
    type: IResponseAddLab,
  })
  async removeLab(@Param() { exameId }: IExameId, @Body() data: IAddLabDto) {
    if (!exameId) {
      throw new HttpException('Id não informado', HttpStatus.BAD_REQUEST);
    }
    const exam = await this.examService.removeLab(exameId, data);
    return exam;
  }
}
