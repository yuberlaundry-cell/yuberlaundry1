
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { SpendChart } from '@/components/business/spend-chart';


const kpiCards = [
  {
    title: 'Total Revenue',
    value: '$2,150,830',
    icon: DollarSign,
    description: '+15.2% this quarter',
  },
  {
    title: 'Net Platform Fees',
    value: '$322,624',
    icon: TrendingUp,
    description: '15% of GMV',
  },
  {
    title: 'Total Refunds',
    value: '$12,450',
    icon: TrendingDown,
    description: '-5% vs last quarter',
  },
];

export default function FinancialsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Financials</h1>
            <p className="text-muted-foreground">
                High-level financial analytics and reconciliation tools.
            </p>
        </div>
        <div className="flex gap-2">
            <button className="bg-primary text-white p-2 rounded-md">
                <Download />
            </button>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold">Reconciliation Dashboard Under Construction</h3>
        <p className="text-muted-foreground">This dashboard will show reconciliation statuses and financial health.</p>
      </div>

    </div>
  );
}
