import { Get, Controller, Post, Put, HttpStatus, HttpException, Param, Body } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Book } from '../../entities';

@Controller('book')
export class BookController {

  constructor(@InjectRepository(Book) private readonly bookRepository: EntityRepository<Book>) { }

  @Get()
  async find() {
    return await this.bookRepository.findAll(['author'], { title: QueryOrder.DESC }, 20);
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const book = await this.bookRepository.findOne(+id, ['books']);

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.title || !body.author) {
      throw new HttpException('One of `title, author` is missing', HttpStatus.BAD_REQUEST);
    }

    const book = new Book(body.title, body.author);
    wrap(book).assign(body);
    await this.bookRepository.persist(book);

    return book;
  }

  @Put(':id')
  async update(@Param() id: string, @Body() body: any) {
    const book = await this.bookRepository.findOne(+id);

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    wrap(book).assign(body);
    await this.bookRepository.persist(book);

    return book;
  }

}
