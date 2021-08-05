import { Module } from '@nestjs/common';
import { LaboratoryController } from '../infra/http/controllers/laboratory.controller';
import { LaboratoryRepository } from '../infra/mongoose/repositories/laboratory.repository';
import { LaboratoryProvider } from '../infra/mongoose/schemas/laboratory.schema';
import { LaboratoryService } from '../services/laboratory.service';

@Module({
  imports: [LaboratoryProvider],
  controllers: [LaboratoryController],
  providers: [LaboratoryService, LaboratoryRepository],
  exports: [LaboratoryService],
})
export class LaboratoryModule {}
