import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap, EntityManager } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Author } from '../../entities';

@Controller('author')
export class AuthorController {

  constructor(
    @InjectRepository(Author) private readonly authorRepository: EntityRepository<Author>,
    private readonly em: EntityManager,
  ) { }

  @Get()
  async find() {
    return await this.authorRepository.findAll({
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
    await this.em.flush();

    return author;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const author = await this.authorRepository.findOneOrFail(id);
    wrap(author).assign(body);
    await this.em.flush();

    return author;
  }

}
