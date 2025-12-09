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
  Contact,
  Building,
  Truck,
  ShoppingCart,
  DollarSign,
  Clock,
  Warehouse,
} from 'lucide-react';
import { OrderStatusChart } from '@/components/laundromat/order-status-chart';
import { SpendChart } from '@/components/business/spend-chart';

const kpiCards = [
  {
    title: 'Active Customers',
    value: '1,245',
    icon: Contact,
    description: '+5.2% this month',
  },
  {
    title: 'Active Drivers',
    value: '86',
    icon: Truck,
    description: '+2 new drivers',
  },
  {
    title: 'Active Laundromats',
    value: '23',
    icon: Building,
    description: '1 at capacity',
  },
  {
    title: 'Active Warehouses',
    value: '4',
    icon: Warehouse,
    description: 'Serving 5 regions',
  },
  {
    title: 'Active Orders',
    value: '312',
    icon: ShoppingCart,
    description: '12 orders at risk',
  },
  {
    title: 'Today\'s Revenue',
    value: '$12,450',
    icon: DollarSign,
    description: '+8.1% vs yesterday',
  },
  {
    title: 'SLA Breaches Today',
    value: '7',
    icon: Clock,
    description: '2 critical',
  },
  {
    title: 'Platform Fee Revenue',
    value: '$1,867.50',
    icon: DollarSign,
    description: 'Today\'s earnings',
  },
];

export default function SuperadminDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Global Dashboard
        </h1>
        <p className="text-muted-foreground">
          Platform-wide operational overview.
        </p>
      </div>

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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <SpendChart />
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Alerts &amp; Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">High order backlog in London</p>
                  <p className="text-red-700">3 laundromats are over 90% capacity.</p>
                </div>
              </div>
               <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                 <div>
                  <p className="font-semibold text-amber-800">Payment Gateway Errors</p>
                  <p className="text-amber-700">Stripe integration is reporting a 5% failure rate.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <OrderStatusChart />
        <Card>
            <CardHeader>
                <CardTitle>Driver Status</CardTitle>
                <CardDescription>Online vs Offline drivers by region.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-16">Chart placeholder</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
