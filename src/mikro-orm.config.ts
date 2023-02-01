import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName:
    process.env.NODE_ENV === 'test'
      ? 'nest-mikro-test-db'
      : 'nest-mikro-dev-db',
  type: 'postgresql',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  allowGlobalContext: process.env.NODE_ENV === 'test',
};

export default config;
