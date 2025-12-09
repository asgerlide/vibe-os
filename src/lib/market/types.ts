export interface Competitor {
  name: string;
  description?: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface MarketData {
  marketDefinition: string;
  marketSize: string;
  marketShare: number;
  growthRate: number;
  competitors: Competitor[];
  competitiveAdvantages: string[];
  targetSegments: string[];
  marketOpportunities: string[];
  chartData: number[];
}



