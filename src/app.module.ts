import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './modules/orm/orm.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [OrmModule, AuthorModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
