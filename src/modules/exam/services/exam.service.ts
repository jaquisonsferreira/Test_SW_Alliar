import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAddLabDto } from 'src/modules/dtos/IAddLab.dto';
import { ICreateExamDto } from 'src/modules/dtos/ICreateExam.dto';
import { IDeleteExamDto } from 'src/modules/dtos/IDeleteExam.dto';
import { IUpdateExamDto } from 'src/modules/dtos/IUpdateExam.dto';
import { LaboratoryService } from 'src/modules/laboratory/services/laboratory.service';

import { ExamRepository } from '../infra/mongoose/repositories/exam.repository';
import { ExamDocument } from '../infra/mongoose/schemas/exam.schema';

@Injectable()
export class ExamService {
  constructor(
    private examRepository: ExamRepository,
    private labService: LaboratoryService,
  ) {}

  async create(data: ICreateExamDto): Promise<ExamDocument[]> {
    const exams = await this.examRepository.create(data);
    return exams;
  }

  async update(data: IUpdateExamDto): Promise<void> {
    for await (const exam of data.exame) {
      await this.examRepository.update(exam._id, exam);
    }
  }

  async addLab(id: string, data: IAddLabDto): Promise<ExamDocument> {
    const examActive = await this.examRepository.findById(id);

    if (!examActive || examActive.status !== 'ativo') {
      throw new HttpException(
        'Exame não encontrado ou inativo',
        HttpStatus.BAD_REQUEST,
      );
    }

    for await (const lab of data.loboratorios) {
      const labActive = await this.labService.findById(lab);
      if (!labActive || labActive.status !== 'ativo') {
        throw new HttpException(
          `Laboratório não encontrado ou inativo id: ${lab}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const exam = await this.examRepository.addLaboratory(id, data);
    return exam;
  }

  async removeLab(id: string, data: IAddLabDto): Promise<ExamDocument> {
    const exam = await this.examRepository.removeLaboratory(id, data);
    return exam;
  }

  async list(): Promise<ExamDocument[]> {
    const exams = await this.examRepository.list('ativo');
    return exams;
  }

  async findByName(name: string): Promise<ExamDocument[]> {
    const exams = await this.examRepository.findByName(name);
    return exams;
  }

  async remove(data: IDeleteExamDto): Promise<void> {
    for await (const exam of data.exame) {
      await this.examRepository.remove(exam._id);
    }
  }
}
