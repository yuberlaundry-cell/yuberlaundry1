
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertCircle,
  Clock,
  Package,
  PackageCheck,
  PackageOpen,
  CheckCheck,
} from 'lucide-react';
import { RecentActivity } from '@/components/laundromat/recent-activity';
import { OrderStatusChart } from '@/components/laundromat/order-status-chart';

const kpiCards = [
  {
    title: 'Incoming Orders',
    value: '12',
    icon: Package,
    description: 'Arriving today',
  },
  {
    title: 'In-Process Orders',
    value: '45',
    icon: PackageOpen,
    description: 'Currently in the facility',
  },
  {
    title: 'Ready for Handoff',
    value: '28',
    icon: PackageCheck,
    description: 'Awaiting driver pickup',
  },
  {
    title: 'Completed Today',
    value: '56',
    icon: CheckCheck,
    description: 'Past 24 hours',
  },
];

export default function LaundromatDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Facility Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time overview of your laundromat's operations.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 xl:col-span-2">
          <OrderStatusChart />
        </div>
        <div className="space-y-8 lg:col-span-3 xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Alerts &amp; Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">2 Delayed Orders</p>
                  <p className="text-amber-700">Orders #YL123 and #YL124 are past their processing SLA.</p>
                </div>
              </div>
               <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                 <div>
                  <p className="font-semibold text-blue-800">Insight</p>
                  <p className="text-blue-700">Peak intake hours are between 9 AM and 12 PM.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <RecentActivity />
    </div>
  );
}
