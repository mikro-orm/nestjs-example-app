import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Book } from '../../entities';

@Controller('book')
export class BookController {

  constructor(@InjectRepository(Book) private readonly bookRepository: EntityRepository<Book>) { }

  @Get()
  async find() {
    return await this.bookRepository.findAll({
      populate: ['author'],
      orderBy: { title: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookRepository.findOneOrFail(id, {
      populate: ['author'],
    });
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.title || !body.author) {
      throw new HttpException('One of `title, author` is missing', HttpStatus.BAD_REQUEST);
    }

    const book = this.bookRepository.create(body);
    wrap(book.author, true).__initialized = true;
    await this.bookRepository.persist(book).flush();

    return book;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    wrap(book).assign(body);
    await this.bookRepository.persist(book);

    return book;
  }

}
