import { Logger } from '@nestjs/common';
import { Options } from 'mikro-orm';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

const logger = new Logger('MikroORM');
const config = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  entitiesDirsTs: ['src/entities'],
  dbName: 'mikro-orm-nest-ts',
  type: 'mysql',
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

export default config;
