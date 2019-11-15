import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [BookController],
  providers: [],
})
export class BookModule {}
