import { Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { Collection, Opt } from '@mikro-orm/mysql';
import { Book } from './Book';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Publisher extends BaseEntity {

  @Property()
  name: string;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  @Enum(() => PublisherType)
  type: PublisherType & Opt;

  constructor(name: string, type = PublisherType.LOCAL) {
    super();
    this.name = name;
    this.type = type;
  }

}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}
