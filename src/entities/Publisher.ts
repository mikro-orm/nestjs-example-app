import { Collection, Entity, Enum, OneToMany, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from './Book';

@Entity()
export class Publisher {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  @Enum(() => PublisherType)
  type: PublisherType & Opt;

  constructor(name: string, type = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}
