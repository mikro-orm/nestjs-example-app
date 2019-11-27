import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { Author, Book, BookTag, Publisher } from '../../entities';
import config from '../../mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [Author, Book, BookTag, Publisher],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
