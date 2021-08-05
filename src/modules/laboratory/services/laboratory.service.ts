import { Injectable } from '@nestjs/common';
import { ICreateLaboratoryDto } from '../dtos/ICreateLaboratory.dto';
import { IDeleteLaboratoryDto } from '../dtos/IDeleteLaboratory.dto';
import { IUpdateLaboratoryDto } from '../dtos/IUpdateLaboratory.dto';
import { LaboratoryRepository } from '../infra/mongoose/repositories/laboratory.repository';
import { LaboratoryDocument } from '../infra/mongoose/schemas/laboratory.schema';

@Injectable()
export class LaboratoryService {
  constructor(private laboratoryRepository: LaboratoryRepository) {}

  async create(data: ICreateLaboratoryDto): Promise<LaboratoryDocument[]> {
    const lab = await this.laboratoryRepository.create(data);
    return lab;
  }

  async update(data: IUpdateLaboratoryDto): Promise<void> {
    for await (const lab of data.laboratorio) {
      await this.laboratoryRepository.update(lab._id, lab);
    }
  }

  async findById(id: string): Promise<LaboratoryDocument | undefined> {
    const lab = await this.laboratoryRepository.findById(id);
    return lab;
  }

  async list(): Promise<LaboratoryDocument[]> {
    const labs = await this.laboratoryRepository.list('ativo');
    return labs;
  }

  async remove(data: IDeleteLaboratoryDto): Promise<void> {
    for await (const lab of data.laboratorio) {
      await this.laboratoryRepository.remove(lab._id);
    }
  }
}
