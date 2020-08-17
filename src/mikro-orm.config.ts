import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

const logger = new Logger('MikroORM');
const config = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-nest-ts',
  type: 'mysql',
  port: 3307,
  metadataProvider: TsMorphMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

export default config;
