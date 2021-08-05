import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAddLabDto } from 'src/modules/dtos/IAddLab.dto';
import { ICreateExamDto, IExam } from 'src/modules/dtos/ICreateExam.dto';
import { Exam, ExamDocument } from '../schemas/exam.schema';

@Injectable()
export class ExamRepository {
  constructor(
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
  ) {}

  async create(data: ICreateExamDto): Promise<ExamDocument[]> {
    const exams = await this.examModel.insertMany(data.exame);
    return exams;
  }

  async findById(id: string): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id);
    return exam;
  }

  async findByName(name: string): Promise<ExamDocument[]> {
    const exams = await this.examModel
      .find({
        nome: { $regex: '.*' + name + '.*', $options: 'i' },
      })
      .populate('laboratorios');
    return exams;
  }

  async list(status: 'ativo' | 'inativo'): Promise<ExamDocument[]> {
    const exams = await this.examModel
      .find({ status })
      .populate('laboratorios');
    return exams;
  }

  async update(id: string, data: IExam): Promise<ExamDocument> {
    const exam = await this.examModel.findByIdAndUpdate(id, data);
    return exam;
  }

  async remove(id: string): Promise<void> {
    await this.examModel.findByIdAndRemove(id);
  }

  async addLaboratory(examId: string, data: IAddLabDto): Promise<ExamDocument> {
    const exam = await this.examModel
      .findByIdAndUpdate(
        examId,
        {
          $addToSet: { laboratorios: { $each: data.loboratorios } },
        },
        { new: true },
      )
      .populate('laboratorios');

    return exam;
  }

  async removeLaboratory(
    examId: string,
    data: IAddLabDto,
  ): Promise<ExamDocument> {
    const exam = await this.examModel
      .findByIdAndUpdate(
        examId,
        {
          $pull: { laboratorios: { $in: data.loboratorios } },
        },
        { new: true },
      )
      .populate('laboratorios');

    return exam;
  }
}
