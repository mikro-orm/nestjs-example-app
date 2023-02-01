import { EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Author } from '../../entities';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>,
  ) {}

  async find() {
    return await this.authorRepository.findAll({
      populate: ['books'],
      orderBy: { name: QueryOrder.DESC },
      limit: 20,
    });
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneOrFail(id, {
      populate: ['books'],
    });
  }

  async create(body: any) {
    const author = this.authorRepository.create(body);
    await this.authorRepository.persist(author).flush();

    return author;
  }

  async update(id: number, body: any) {
    const author = await this.authorRepository.findOneOrFail(id);
    wrap(author).assign(body);
    this.authorRepository.persist(author);

    return author;
  }
}
