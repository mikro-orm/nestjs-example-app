import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { Collection } from '@mikro-orm/mysql';
import { Book } from './Book';

@Entity()
export class BookTag {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @ManyToMany(() => Book, b => b.tags)
  books = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }

}
