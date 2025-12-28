import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

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

  createReport(payload: { source: string; amount: number }, type: ReportType) {
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

  updateReport(
    payload: { source: string; amount: number },
    id: string,
    type: ReportType,
  ) {
    const report = data.report.find(
      (report) => report.id === id && report.type === type,
    );

    if (report) {
      report.source = payload.source;
      report.amount = payload.amount;
      report.updated_at = new Date().toISOString();
    }
    return report;
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
