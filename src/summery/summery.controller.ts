import { Controller, Get } from '@nestjs/common';
import { SummeryService } from './summery.service';

@Controller('summery')
export class SummeryController {
  constructor(private readonly summaryService: SummeryService) {}

  @Get()
  getSummary() {
    return this.summaryService.calculateSummary();
  }
}
