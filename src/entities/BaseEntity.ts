import { PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { Opt } from '@mikro-orm/mysql';

export abstract class BaseEntity {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();

}
