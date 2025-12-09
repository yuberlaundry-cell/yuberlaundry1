'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  BrainCircuit,
  TrendingUp,
  Container,
  Route,
  ShieldAlert,
  Leaf,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const intelligenceTools = [
  {
    icon: TrendingUp,
    title: 'Demand Forecasts',
    description: 'Predict order volume and supply needs.',
    href: '/admin/intelligence/demand-forecasts',
  },
  {
    icon: Container,
    title: 'Capacity Planning',
    description: 'Plan for driver, laundromat, and warehouse resources.',
    href: '/admin/intelligence/capacity-planning',
  },
  {
    icon: Route,
    title: 'Routing Optimizer',
    description: 'Optimize routes for drivers and order flow.',
    href: '/admin/intelligence/routing-optimizer',
  },
  {
    icon: ShieldAlert,
    title: 'Risk & Anomaly Detection',
    description: 'Identify unusual patterns and predict SLA risks.',
    href: '/admin/intelligence/risk-detection',
  },
  {
    icon: Leaf,
    title: 'Sustainability Insights',
    description: 'Track and improve your environmental footprint.',
    href: '/admin/intelligence/sustainability',
  },
  {
    icon: DollarSign,
    title: 'Predictive Pricing',
    description: 'Get insights to optimize pricing and promotions.',
    href: '/admin/intelligence/pricing-analysis',
  },
];

export default function IntelligencePage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <BrainCircuit className="h-8 w-8" />
          Intelligence & Forecasting
        </h1>
        <p className="text-muted-foreground">
          AI-driven insights for proactive platform operations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {intelligenceTools.map((tool) => (
          <Card
            key={tool.title}
            className="flex flex-col hover:border-primary transition-all"
          >
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <tool.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={tool.href}
                className="text-sm font-medium text-primary flex items-center gap-1"
              >
                Go to {tool.title} <ArrowRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
