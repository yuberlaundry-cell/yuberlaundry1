
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Building,
    Edit,
    FileText,
    MessageSquare,
    Package,
    Percent,
    ShieldOff,
    Star,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { OrderStatusChart } from '@/components/laundromat/order-status-chart';

const laundromatData = {
    'L-001': {
        name: 'Speedy Suds',
        location: 'London, UK',
        status: 'Active',
        stats: [
            { label: 'Avg. Rating', value: '4.8', icon: Star },
            { label: 'Active Orders', value: '25', icon: Package },
            { label: 'Issue Rate', value: '1.2%', icon: Percent },
            { label: 'YTD Revenue', value: 'R1.2M', icon: TrendingUp },
        ],
        recentOrders: [
            { id: '#YL12350', status: 'Washing', customer: 'Alice' },
            { id: '#YL12348', status: 'Drying', customer: 'Bob' },
            { id: '#YL12345', status: 'Ready', customer: 'Charlie' },
        ],
    }
};

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Onboarding: 'bg-blue-100 text-blue-800',
};

const jobStatusColors: { [key: string]: string } = {
  Ready: 'text-green-500',
  Washing: 'text-blue-500',
  Drying: 'text-blue-500',
};


export default function LaundromatProfilePage() {
    const params = useParams();
    const laundromatId = params.id as keyof typeof laundromatData;
    const laundromat = laundromatData[laundromatId] || laundromatData['L-001'];

    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/admin/laundromats">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Laundromats
                    </Link>
                </Button>
                 <div className="flex items-center gap-4 mt-2">
                    <div className="bg-muted p-3 rounded-lg">
                        <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{laundromat.name}</h1>
                            <Badge variant="secondary" className={statusColors[laundromat.status]}>{laundromat.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{laundromat.location}</p>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><FileText className="mr-2"/> View Contract</Button>
                    <Button variant="outline"><Edit className="mr-2"/> Edit</Button>
                    <Button variant="destructive"><ShieldOff className="mr-2"/> Deactivate</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {laundromat.stats.map(stat => (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <OrderStatusChart />
                </div>
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {laundromat.recentOrders.map(job => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/admin/orders/${job.id.replace('#', '')}`} className="hover:underline">
                                                {job.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{job.customer}</TableCell>
                                        <TableCell>
                                            <span className={jobStatusColors[job.status]}>{job.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
