'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const services = [
  { name: 'Authentication API', status: 'Operational', uptime: '99.99%', latency: '80ms' },
  { name: 'Booking API', status: 'Operational', uptime: '99.99%', latency: '120ms' },
  { name: 'Orders API', status: 'Degraded Performance', uptime: '99.80%', latency: '450ms' },
  { name: 'Drivers API', status: 'Operational', uptime: '99.98%', latency: '150ms' },
  { name: 'Payments API', status: 'Under Maintenance', uptime: 'N/A', latency: 'N/A' },
  { name: 'Notifications API', status: 'Operational', uptime: '99.99%', latency: '50ms' },
];

const statusIcons = {
  Operational: <CheckCircle className="h-5 w-5 text-green-500" />,
  'Degraded Performance': <AlertTriangle className="h-5 w-5 text-amber-500" />,
  'Under Maintenance': <Clock className="h-5 w-5 text-blue-500" />,
  'Major Outage': <XCircle className="h-5 w-5 text-red-500" />,
};

const statusColors = {
  Operational: 'bg-green-100 text-green-800',
  'Degraded Performance': 'bg-amber-100 text-amber-800',
  'Under Maintenance': 'bg-blue-100 text-blue-800',
  'Major Outage': 'bg-red-100 text-red-800',
}


export default function ApiStatusPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">API Status</h1>
        <p className="text-muted-foreground">
          Live status and performance of all platform microservices.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Core Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {services.map((service, index) => (
                <React.Fragment key={service.name}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            {statusIcons[service.status as keyof typeof statusIcons]}
                            <h3 className="font-semibold text-lg">{service.name}</h3>
                        </div>
                         <div className="flex items-center gap-6 text-sm">
                            <div className="text-right">
                                <p className="text-muted-foreground">Uptime (90d)</p>
                                <p className="font-medium">{service.uptime}</p>
                            </div>
                             <div className="text-right">
                                <p className="text-muted-foreground">Latency (p95)</p>
                                <p className="font-medium">{service.latency}</p>
                            </div>
                            <Badge variant="secondary" className={statusColors[service.status as keyof typeof statusColors]}>
                                {service.status}
                            </Badge>
                        </div>
                    </div>
                    {index < services.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
