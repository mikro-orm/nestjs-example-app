import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { BookTagService } from './book-tag.service';

@Module({
  imports: [OrmModule],
  providers: [BookTagService],
  exports: [BookTagService],
})
export class BookTagModule {}
