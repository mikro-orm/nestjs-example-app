import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-nest-ts',
  type: 'mysql',
  port: 3307,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
