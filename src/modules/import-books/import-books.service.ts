import { MikroORM } from '@mikro-orm/core';
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Book } from '../../entities';
import { BookTagService } from '../../modules/book-tag/book-tag.service';
import { BookService } from '../../modules/book/book.service';

@Injectable()
export class ImportBooksService {
  constructor(
    private readonly orm: MikroORM<PostgreSqlDriver>,
    private readonly bookService: BookService,
    private readonly bookTagService: BookTagService,
  ) {}

  async bulkCreate(bookInputs: any[]) {
    console.log('import-books-service');
    console.log({ isInTransaction: this.orm.em.isInTransaction() });

    const em = this.orm.em.fork();
    await em.begin();

    const createdBooks: Book[] = [];
    try {
      for (const bookInput of bookInputs) {
        const book = await this.bookService.create(bookInput);

        if (bookInput.tags) {
          const tagsInput = bookInput.tags;
          const tags = await this.bookTagService.bulkCreate(tagsInput);
          book.tags.add(tags);
        }
        createdBooks.push(book);
      }
      await em.commit();
    } catch (error) {
      // Roll back any books and tags that were created
      await em.rollback();
      throw error;
    }

    return createdBooks;
  }
}
