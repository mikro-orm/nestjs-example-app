import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Author, Book, BookTag, Publisher } from '../../entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Author, Book, BookTag, Publisher],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
