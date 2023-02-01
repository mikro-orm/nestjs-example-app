import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from '../../entities';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async find() {
    return await this.bookService.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.title || !body.author) {
      throw new HttpException(
        'One of `title, author` is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = this.bookService.create(body);
    return book;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const book = await this.bookService.update(id, body);

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }
}
