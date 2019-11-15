import { IdEntity, PrimaryKey, Property } from 'mikro-orm';

export abstract class BaseEntity implements IdEntity<BaseEntity> {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

}
