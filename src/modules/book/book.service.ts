import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Book } from '../../entities';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
  ) {}

  async find() {
    return await this.bookRepository.findAll({
      populate: ['author'],
      orderBy: { title: QueryOrder.DESC },
      limit: 20,
    });
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneOrFail(id, {
      populate: ['author'],
    });
  }

  async create(body: any) {
    const book = this.bookRepository.create(body);
    await this.bookRepository.persistAndFlush(book);

    return book;
  }

  async update(id: number, body: any) {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      return null;
    }

    wrap(book).assign(body);
    await this.bookRepository.persist(book);

    return book;
  }
}
