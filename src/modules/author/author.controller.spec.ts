import { MikroORM } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';
import { Author } from '../../entities';
import { AuthorController } from './author.controller';

describe('author controller', () => {

  let authorController: AuthorController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          dbName: 'nest-mikro-test-db',
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Author] }),
      ],
      controllers: [AuthorController],
    }).compile();

    authorController = module.get(AuthorController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  it(`CRUD`, async () => {
    const res1 = await authorController.create({ name: 'a1', email: 'e1', books: [{ title: 'b1' }, { title: 'b2' }] });
    expect(res1.id).toBeDefined();
    expect(res1.name).toBe('a1');
    expect(res1.email).toBe('e1');
    expect(res1.termsAccepted).toBe(false);
    expect(res1.books).toHaveLength(2);

    const id = res1.id;

    const res2 = await authorController.find();
    expect(res2).toHaveLength(1);
    expect(res2[0].id).toBeDefined();
    expect(res2[0].name).toBe('a1');
    expect(res2[0].email).toBe('e1');
    expect(res2[0].termsAccepted).toBe(false);
    expect(res2[0].books).toHaveLength(2);

    const res3 = await authorController.update(id, { name: 'a2' });
    expect(res3.id).toBeDefined();
    expect(res3.name).toBe('a2');
    expect(res3.email).toBe('e1');
    expect(res3.termsAccepted).toBe(false);
  });

});
