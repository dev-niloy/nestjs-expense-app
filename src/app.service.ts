import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
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
export class AppService {
  getAllIReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getIReportById(id: string, type: ReportType) {
    return data.report.find(
      (report) => report.id === id && report.type === type,
    );
  }

  createReport(payload: ReportPayload, type: ReportType) {
    const new_data = {
      id: uuid(),
      source: payload.source,
      amount: payload.amount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: type,
    };
    data.report.push(new_data);
    return new_data;
  }

  updateReport(type: ReportType, id: string, body: UpdateReportPayload) {
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
      updated_at: new Date().toISOString(),
    };

    return data.report[reportIndex];
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
