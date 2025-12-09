'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DollarSign,
  Users,
  BarChart,
  LineChart,
  GitBranch,
  Mail,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

const kpiCards = [
  {
    title: 'Influenced Revenue',
    value: '$45,231.89',
    icon: DollarSign,
    description: '+20.1% from last month',
  },
  {
    title: 'Engaged Users',
    value: '+2,350',
    icon: Users,
    description: '+180.1% from last month',
  },
  {
    title: 'Conversion Rate',
    value: '3.45%',
    icon: BarChart,
    description: '+1.2% from last month',
  },
  {
    title: 'Active Journeys',
    value: '12',
    icon: GitBranch,
    description: '2 new this week',
  },
];

const campaigns = [
    { name: 'Welcome Series', channel: 'Email', sends: '1.2k', opens: '58.2%', clicks: '9.7%' },
    { name: 'First Order Discount', channel: 'SMS', sends: '850', opens: 'N/A', clicks: '15.3%' },
    { name: 'Reactivation Campaign', channel: 'Push', sends: '5.4k', opens: '25.1%', clicks: '4.2%' },
]

export default function MarketingPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Marketing &amp; Automation</h1>
        <p className="text-muted-foreground">
          Drive growth with automated journeys, campaigns, and customer segmentation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="grid lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Conversions Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                    <LineChart className="h-16 w-16 text-muted-foreground/50"/>
                    <p className="text-muted-foreground">Chart placeholder</p>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {campaigns.map(c => (
                        <div key={c.name} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                {c.channel === 'Email' && <Mail className="h-4 w-4 text-muted-foreground"/>}
                                {c.channel === 'SMS' && <MessageSquare className="h-4 w-4 text-muted-foreground"/>}
                                {c.channel === 'Push' && <Mail className="h-4 w-4 text-muted-foreground"/>}
                                <p className="font-medium">{c.name}</p>
                            </div>
                            <div className="flex gap-4">
                                <p><span className="text-muted-foreground">Sends:</span> {c.sends}</p>
                                <p><span className="text-muted-foreground">Opens:</span> {c.opens}</p>
                                <p><span className="text-muted-foreground">Clicks:</span> {c.clicks}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
