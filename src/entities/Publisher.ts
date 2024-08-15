import { Collection, Entity, Enum, OneToMany, Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from './Book';
import { BaseEntity } from "./BaseEntity"

@Entity()
export class Publisher extends BaseEntity {
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
