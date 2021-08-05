import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, id: true })
export class Laboratory {
  @Prop()
  nome: string;

  @Prop()
  endereco: string;

  @Prop({ enum: ['ativo', 'inativo'], default: 'ativo' })
  status: string;
}

export type LaboratoryDocument = Laboratory & mongoose.Document;

export const LaboratorySchema = SchemaFactory.createForClass(Laboratory);

export const LaboratoryProvider = MongooseModule.forFeature(
  [
    {
      name: Laboratory.name,
      schema: SchemaFactory.createForClass(Laboratory),
    },
  ],
  'DATABASE_CONNECTION',
);
