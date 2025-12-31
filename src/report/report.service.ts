import { Injectable } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';
import { v4 as uuid } from 'uuid';

interface ReportPayload {
  amount: number;
  source: string;
}

interface UpdateReportPayload {
  source?: string;
  amount?: number;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    const reports = data.report.filter((report) => report.type === type);
    return reports.map((report) => new ReportResponseDto(report));
  }

  getReportById(id: string, type: ReportType): ReportResponseDto | undefined {
    const report = data.report.find(
      (report) => report.id === id && report.type === type,
    );

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(payload: ReportPayload, type: ReportType): ReportResponseDto {
    const new_data = {
      id: uuid(),
      source: payload.source,
      amount: payload.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(new_data);
    return new ReportResponseDto(new_data);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportPayload,
  ): ReportResponseDto | undefined {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string, type: ReportType) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );
    if (reportIndex !== -1) {
      data.report.splice(reportIndex, 1);
    }

    return { message: 'Report deleted successfully' };
  }
}
