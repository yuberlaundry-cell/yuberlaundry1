'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Activity,
  AlertCircle,
  Database,
  Server,
  CheckCircle,
} from 'lucide-react';
import { OrderStatusChart } from '@/components/laundromat/order-status-chart';
import { SpendChart } from '@/components/business/spend-chart';


const kpiCards = [
  {
    title: 'API Response Time',
    value: '120ms',
    icon: Activity,
    description: 'p95 average',
  },
  {
    title: 'Server Load',
    value: '35%',
    icon: Server,
    description: 'All instances healthy',
  },
  {
    title: 'Error Rate',
    value: '0.02%',
    icon: AlertCircle,
    description: 'Last hour',
  },
  {
    title: 'Database CPU',
    value: '25%',
    icon: Database,
    description: 'No slow queries',
  },
];

export default function SystemMonitoringPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          System Monitoring
        </h1>
        <p className="text-muted-foreground">
          Real-time platform health and performance metrics.
        </p>
      </div>

       <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-700" />
            <AlertTitle className="text-green-800">All Systems Operational</AlertTitle>
            <AlertDescription className="text-green-700">
                All services are running smoothly with no active incidents.
            </AlertDescription>
        </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid lg:grid-cols-2 gap-8">
        <SpendChart />
        <OrderStatusChart />
      </div>
    </div>
  );
}
