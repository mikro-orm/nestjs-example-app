import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BookTag } from '../../entities';

@Injectable()
export class BookTagService {
  constructor(
    private readonly orm: MikroORM<PostgreSqlDriver>,

    @InjectRepository(BookTag)
    private readonly bookTagRepository: EntityRepository<BookTag>,
  ) {}

  async create(body: any) {
    const tag = this.bookTagRepository.create(body);
    await this.bookTagRepository.persist(tag).flush();

    return tag;
  }

  async bulkCreate(tagInputs: BookTag[]) {
    console.log('book-tags-service');
    console.log(this.orm.em.isInTransaction());

    const em = this.orm.em.fork();
    await em.begin();

    try {
      const createdTags: BookTag[] = [];
      for (const tagInput of tagInputs) {
        const tag = this.bookTagRepository.create(tagInput);
        createdTags.push(tag);
      }
      await this.bookTagRepository.persistAndFlush(createdTags);

      await em.commit();
      return createdTags;
    } catch (error) {
      await em.rollback();
      throw error;
    }
  }
}
