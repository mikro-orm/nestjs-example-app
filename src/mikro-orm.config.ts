import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-nest-ts',
  port: 3307,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
});
