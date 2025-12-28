export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: string;
    updated_at: string;
    type: ReportType;
  }[];
}

export const data: Data = {
  report: [
    {
      id: '1',
      source: 'Salary',
      amount: 5000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.INCOME,
    },
    {
      id: '2',
      source: 'Bonus',
      amount: 2000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.INCOME,
    },

    {
      id: '3',
      source: 'Stock Investment',
      amount: 50000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.INCOME,
    },
    {
      id: '4',
      source: 'Rent',
      amount: 1500,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.EXPENSE,
    },
    {
      id: '5',
      source: 'Groceries',
      amount: 300,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.EXPENSE,
    },
    {
      id: '6',
      source: 'Utilities',
      amount: 200,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      type: ReportType.EXPENSE,
    },
  ],
};

data.report.push({
  id: '1',
  source: 'Salary',
  amount: 5000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  type: ReportType.INCOME,
});
