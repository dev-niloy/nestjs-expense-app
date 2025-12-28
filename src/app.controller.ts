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
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
@Controller('report/:type')
export class AppController {
  @Get()
  getAllIReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getIReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.find(
      (report) => report.id === id && report.type === reportType,
    );
  }

  @Post()
  createIReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const new_data = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(new_data);
    return new_data;
  }

  @Put(':id')
  updateIReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report.find(
      (report) => report.id === id && report.type === reportType,
    );

    if (report) {
      report.source = source;
      report.amount = amount;
      report.updated_at = new Date().toISOString();
    }
    return report;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIReport(@Param('id') id: string, @Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === reportType,
    );
    if (reportIndex !== -1) {
      data.report.splice(reportIndex, 1);
    }

    return { message: 'Report deleted successfully' };
  }
}

// http://localhost:3000/
