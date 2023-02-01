import { Module } from '@nestjs/common';
import { BookTagModule } from '../../modules/book-tag/book-tag.module';
import { BookModule } from '../../modules/book/book.module';
import { OrmModule } from '../orm/orm.module';
import { ImportBooksController } from './import-books.controller';
import { ImportBooksService } from './import-books.service';

@Module({
  imports: [BookModule, BookTagModule],
  controllers: [ImportBooksController],
  providers: [ImportBooksService],
  exports: [ImportBooksService],
})
export class ImportBooksModule {}
