import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateLaboratoryDto } from 'src/modules/laboratory/dtos/ICreateLaboratory.dto';
import { ILaboratoryUpdate } from '../../../dtos/IUpdateLaboratory.dto';
import { Laboratory, LaboratoryDocument } from '../schemas/laboratory.schema';

@Injectable()
export class LaboratoryRepository {
  constructor(
    @InjectModel(Laboratory.name)
    private laboratoryModel: Model<LaboratoryDocument>,
  ) {}

  async create(data: ICreateLaboratoryDto): Promise<LaboratoryDocument[]> {
    const labs = await this.laboratoryModel.insertMany(data.laboratorio);
    return labs;
  }

  async findById(id: string): Promise<LaboratoryDocument | undefined> {
    const lab = await this.laboratoryModel.findById(id);
    return lab;
  }

  async list(status: string): Promise<LaboratoryDocument[]> {
    const labs = await this.laboratoryModel.find({ status });
    return labs;
  }

  async update(
    id: string,
    data: ILaboratoryUpdate,
  ): Promise<LaboratoryDocument> {
    const lab = await this.laboratoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return lab;
  }

  async remove(id: string): Promise<void> {
    await this.laboratoryModel.findByIdAndRemove(id);
  }
}
