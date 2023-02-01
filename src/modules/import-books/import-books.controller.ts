import { Body, Controller, Post } from '@nestjs/common';
import { ImportBooksService } from './import-books.service';

@Controller('import-books')
export class ImportBooksController {
  constructor(private readonly importBooksService: ImportBooksService) {}

  @Post()
  async importBooks(@Body() body: any) {
    return await this.importBooksService.bulkCreate(body);
  }
}
