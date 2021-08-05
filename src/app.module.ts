import { LaboratoryModule } from './modules/laboratory/module/laboratory.module';
import { DbModule } from './settings/db/module/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './modules/exam/module/exam.module';

@Module({
  imports: [
    DbModule,
    LaboratoryModule,
    ExamModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
