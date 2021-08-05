import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DbProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    connectionName: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) => ({
      uri: config.get('URL_MONGODB'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }),
    inject: [ConfigService],
  }),
];
