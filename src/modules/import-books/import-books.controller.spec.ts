import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { Author, Book, BookTag } from '../../entities';
import config from '../../mikro-orm.config';
import { BookTagModule } from '../../modules/book-tag/book-tag.module';
import { BookModule } from '../../modules/book/book.module';
import { BookTagService } from '../book-tag/book-tag.service';
import { BookService } from '../book/book.service';
import { ImportBooksController } from './import-books.controller';
import { ImportBooksModule } from './import-books.module';
import { ImportBooksService } from './import-books.service';

describe('import-books controller', () => {
  let importBooksController: ImportBooksController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Book, BookTag, Author] }),
      ],
      controllers: [ImportBooksController],
      providers: [BookService, BookTagService, ImportBooksService],
    }).compile();

    importBooksController = module.get(ImportBooksController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterEach(async () => await orm.close(true));

  it(`should create a list of books with tags`, async () => {
    const authorRepo = orm.em.getRepository(Author);
    const placeholderAuthor = authorRepo.create({
      id: 1,
      name: 'placeholder name',
      email: 'test@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await orm.em.persistAndFlush(placeholderAuthor);

    await importBooksController.importBooks([
      {
        title: 'book-0',
        author: placeholderAuthor.id,
        tags: [
          { name: 'book-0-tag-0' },
          { name: 'book-0-tag-1' },
          { name: 'book-0-tag-2' },
        ],
      },
      {
        title: 'book-1',
        author: placeholderAuthor.id,
        tags: [
          { name: 'book-1-tag-0' },
          { name: 'book-1-tag-1' },
          { name: 'book-1-tag-2' },
        ],
      },
    ]);

    const books = await orm.em.find(Book, {});
    expect(books).toHaveLength(2);
  });

  it(`should not have created any books or tags if there is a failure`, async () => {
    const authorRepo = orm.em.getRepository(Author);
    const placeholderAuthor = authorRepo.create({
      id: 1,
      name: 'placeholder name',
      email: 'test@test.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await orm.em.persistAndFlush(placeholderAuthor);

    try {
      const res1 = await importBooksController.importBooks([
        {
          title: 'book-0',
          author: placeholderAuthor.id,
          tags: [
            { name: 'book-0-tag-0' },
            { name: 'book-0-tag-1' },
            { name: 'book-0-tag-2' },
          ],
        },
        {
          title: 'book-1',
          author: placeholderAuthor.id,
          tags: [
            { name: 'book-1-tag-0' },
            { name: 'book-1-tag-1' },
            {}, // name is required, should fail and roll back the whole thing
          ],
        },
      ]);
    } catch (_e) {
      // no-op here, we expect to get an error
    }

    const books = await orm.em.find(Book, {});
    expect(books).toHaveLength(0);
    const tags = await orm.em.find(BookTag, {});
    expect(tags).toHaveLength(0);
    expect(1).toBe(1);
  });
});
