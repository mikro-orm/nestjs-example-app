import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/mysql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  await orm.schema.ensureDatabase();
  await orm.schema.update();
  await app.listen(3000);
}
bootstrap();
