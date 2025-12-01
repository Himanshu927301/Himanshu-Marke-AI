export interface NewsItem {
  title: string;
  source: string;
  url?: string;
}

export interface StockAnalysis {
  symbol: string;
  name: string;
  currentPrice: string;
  currency: string;
  changePercent: string;
  signal: 'CALL' | 'PUT' | 'HOLD'; // Buy/Sell/Hold
  confidence: string; // e.g. "98%"
  reasoning: string;
  news: NewsItem[];
  trendDirection: 'UP' | 'DOWN' | 'FLAT';
  predictedTarget?: string;
}

export interface StockPreview {
  symbol: string;
  name: string;
}