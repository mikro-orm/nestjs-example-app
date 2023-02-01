import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { Book } from '../../entities';
import config from '../../mikro-orm.config';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('book controller', () => {
  let bookController: BookController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Book] }),
      ],
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = module.get(BookController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  it(`CRUD`, async () => {
    const res1 = await bookController.create({
      title: 'b1',
      author: { name: 'a1', email: 'e1' },
    });
    expect(res1.id).toBeDefined();
    expect(res1.title).toBe('b1');
    expect(res1.author.name).toBe('a1');
    expect(res1.author.email).toBe('e1');
    expect(res1.author.termsAccepted).toBe(false);
    expect(res1.author.books).toHaveLength(1);

    const id = res1.id;

    const res2 = await bookController.find();
    expect(res2[0].id).toBeDefined();
    expect(res2[0].title).toBe('b1');
    expect(res2[0].author.name).toBe('a1');
    expect(res2[0].author.email).toBe('e1');
    expect(res2[0].author.termsAccepted).toBe(false);

    const res3 = await bookController.update(id, { title: 'b2' });
    expect(res3.id).toBeDefined();
    expect(res3.title).toBe('b2');
    expect(res3.author).toBeDefined();
  });
});
