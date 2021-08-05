import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Status, Tipo } from '../../../../dtos/@types';

@Schema({ timestamps: true, id: true })
export class Exam {
  @Prop({
    default: null,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Laboratory',
  })
  laboratorios: [string];

  @Prop({ required: true })
  nome: string;

  @Prop({ enum: Tipo })
  tipo: string;

  @Prop({ enum: Status, default: 'ativo' })
  status: string;
}

export type ExamDocument = Exam & mongoose.Document;

export const ExamSchema = SchemaFactory.createForClass(Exam);

export const ExamProvider = MongooseModule.forFeature(
  [
    {
      name: Exam.name,
      schema: SchemaFactory.createForClass(Exam),
    },
  ],
  'DATABASE_CONNECTION',
);
