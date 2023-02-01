import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  imports: [OrmModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
