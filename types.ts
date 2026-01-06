
export interface Sale {
  id: string;
  productName: string;
  customerName?: string;
  value: number;
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  monthKey: string; // YYYY-MM
}

export interface MonthlyHistory {
  monthKey: string;
  total: number;
  count: number;
}
