import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [OrmModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
