import { Module } from '@nestjs/common';
import { DbProviders } from '../providers/db.provider';

@Module({
  imports: [...DbProviders],
  providers: [],
})
export class DbModule {}
