import { Collection, Entity, Enum, IdEntity, OneToMany, PrimaryKey, Property } from 'mikro-orm';
import { Book } from '.';

@Entity()
export class Publisher implements IdEntity<Publisher> {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  @Enum()
  type: PublisherType;

  constructor(name: string, type = PublisherType.LOCAL) {
    this.name = name;
    this.type = type;
  }

}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}
