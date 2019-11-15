import { Logger, Module } from '@nestjs/common';
import { MikroORM, Options } from 'mikro-orm';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { Author, Book, BaseEntity, BookTag, Publisher } from '../../entities';

const logger = new Logger(MikroORM.name);
const ormOptions = {
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  entitiesDirsTs: ['src/entities'],
  dbName: 'mikro-orm-nest-ts',
  type: 'mysql',
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

@Module({
  imports: [
    MikroOrmModule.forRoot(ormOptions),
    MikroOrmModule.forFeature({
      entities: [Author, Book, BookTag, Publisher, BaseEntity as any],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
