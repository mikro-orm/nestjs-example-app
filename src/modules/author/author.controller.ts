import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EntityRepository, FilterQuery, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Author } from '../../entities';

@Controller('author')
export class AuthorController {

  constructor(@InjectRepository(Author) private readonly authorRepository: EntityRepository<Author>) { }

  @Get()
  async find() {
    const where: FilterQuery<Author> = {}

    where.name = { $gte: 40 }

    return await this.authorRepository.findAndCount(where,{
      populate: ['books'],
      orderBy: { name: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.authorRepository.findOneOrFail(id, {
      populate: ['books'],
    });
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.name || !body.email) {
      throw new HttpException('One of `name, email` is missing', HttpStatus.BAD_REQUEST);
    }

    const author = this.authorRepository.create(body);
    await this.authorRepository.persist(author).flush();

    return author;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const author = await this.authorRepository.findOneOrFail(id);
    wrap(author).assign(body);
    await this.authorRepository.persist(author);

    return author;
  }

}
