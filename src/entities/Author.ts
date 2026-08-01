import { Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { Cascade, Collection, Opt } from '@mikro-orm/mysql';

import { Book } from '.';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Author extends BaseEntity {

  @Property()
  name: string;

  @Property()
  email: string;

  @Property({ nullable: true })
  age?: number;

  @Property()
  termsAccepted: boolean & Opt = false;

  @Property({ nullable: true })
  born?: Date;

  @OneToMany(() => Book, b => b.author, { cascade: [Cascade.ALL] })
  books = new Collection<Book>(this);

  @ManyToOne(() => Book, { nullable: true })
  favouriteBook?: Book;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

}
