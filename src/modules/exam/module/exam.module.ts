import { Module } from '@nestjs/common';
import { LaboratoryModule } from 'src/modules/laboratory/module/laboratory.module';
import { ExamController } from '../infra/controllers/exam.controller';
import { ExamRepository } from '../infra/mongoose/repositories/exam.repository';
import { ExamProvider } from '../infra/mongoose/schemas/exam.schema';
import { ExamService } from '../services/exam.service';

@Module({
  imports: [ExamProvider, LaboratoryModule],
  controllers: [ExamController],
  providers: [ExamService, ExamRepository],
})
export class ExamModule {}
