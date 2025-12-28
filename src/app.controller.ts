import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllIReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllIReports(reportType);
  }

  @Get(':id')
  getIReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getIReportById(id, reportType);
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const payload = { source, amount };

    return this.appService.createReport(payload, reportType);
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const payload = { source, amount };
    return this.appService.updateReport(payload, id, reportType);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string, @Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.deleteReport(id, reportType);
  }
}
