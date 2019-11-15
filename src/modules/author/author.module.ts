import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [AuthorController],
  providers: [],
})
export class AuthorModule {}
