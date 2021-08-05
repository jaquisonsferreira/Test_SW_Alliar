import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateLaboratoryDto } from 'src/modules/laboratory/dtos/ICreateLaboratory.dto';
import { IDeleteLaboratoryDto } from 'src/modules/laboratory/dtos/IDeleteLaboratory.dto';
import { IResponseLaboratory } from 'src/modules/laboratory/dtos/IResponseLaboratory.dto';
import { IUpdateLaboratoryDto } from 'src/modules/laboratory/dtos/IUpdateLaboratory.dto';
import { LaboratoryService } from 'src/modules/laboratory/services/laboratory.service';

@ApiTags('Laboratório')
@Controller('laboratorio')
export class LaboratoryController {
  constructor(private laboratoryService: LaboratoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: [IResponseLaboratory],
    description: 'Laboratório criado com sucesso',
  })
  async create(@Body() data: ICreateLaboratoryDto) {
    const lab = await this.laboratoryService.create(data);
    return lab;
  }

  @Get()
  @ApiResponse({ status: 201, type: [IResponseLaboratory] })
  async list() {
    const labs = await this.laboratoryService.list();
    return labs;
  }

  @Put()
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async update(@Body() data: IUpdateLaboratoryDto) {
    await this.laboratoryService.update(data);
  }

  @Delete()
  @HttpCode(200)
  async delete(@Body() data: IDeleteLaboratoryDto) {
    await this.laboratoryService.remove(data);
  }
}
