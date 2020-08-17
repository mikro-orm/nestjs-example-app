import { Get, Controller, Post, Put, HttpStatus, HttpException, Param, Body } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Author } from '../../entities';

@Controller('author')
export class AuthorController {

  constructor(@InjectRepository(Author) private readonly authorRepository: EntityRepository<Author>) { }

  @Get()
  async find() {
    return await this.authorRepository.findAll(['books'], { name: QueryOrder.DESC }, 20);
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const author = await this.authorRepository.findOne(+id, ['books']);

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return author;
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.name || !body.email) {
      throw new HttpException('One of `name, email` is missing', HttpStatus.BAD_REQUEST);
    }

    const author = new Author(body.name, body.email);
    wrap(author).assign(body);
    await this.authorRepository.persist(author);

    return author;
  }

  @Put(':id')
  async update(@Param() id: string, @Body() body: any) {
    const author = await this.authorRepository.findOne(+id);

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    wrap(author).assign(body);
    await this.authorRepository.persist(author);

    return author;
  }

}
