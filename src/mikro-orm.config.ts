import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
  clientUrl: process.env.DATABASE_URL as string,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
  },
  driverOptions: {
    connection: {
      ssl: true,
    },
  },
});
