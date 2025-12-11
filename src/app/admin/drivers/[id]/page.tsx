
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
    Edit,
    MessageSquare,
    ShieldOff,
    Star,
    TrendingUp,
    Wallet,
    Truck,
    MapPin,
    Calendar,
    Percent,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

const driverData = {
    'D-001': {
        name: 'Alex Ray',
        avatar: 'https://picsum.photos/seed/driver1/100/100',
        email: 'alex.ray@yuber.com',
        status: 'Online',
        joinDate: 'Jan 15, 2023',
        location: 'London, UK',
        vehicle: 'Blue Toyota Prius - LAUNDRY1',
        stats: [
            { label: 'Avg. Rating', value: '4.9', icon: Star },
            { label: 'Acceptance Rate', value: '98%', icon: Percent },
            { label: 'Jobs This Month', value: '112', icon: Truck },
            { label: 'Total Earnings', value: 'R45,820', icon: Wallet },
        ],
        recentJobs: [
            { id: '#YL12350', status: 'Completed', earnings: 'R120.50' },
            { id: '#YL12348', status: 'Completed', earnings: 'R95.00' },
            { id: '#YL12345', status: 'In Progress', earnings: 'R150.00' },
        ],
        performance: {
            onTimeArrival: 96,
            customerRating: 98,
            acceptanceRate: 98,
        }
    }
};

const statusColors: { [key: string]: string } = {
  Online: 'bg-green-100 text-green-800',
  Offline: 'bg-gray-100 text-gray-800',
  'On a Job': 'bg-blue-100 text-blue-800',
};

const jobStatusColors: { [key: string]: string } = {
  Completed: 'text-green-500',
  'In Progress': 'text-amber-500',
};


export default function DriverProfilePage() {
    const params = useParams();
    const driverId = params.id as keyof typeof driverData;
    const driver = driverData[driverId] || driverData['D-001'];

    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/admin/drivers">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Drivers
                    </Link>
                </Button>
                 <div className="flex items-center gap-4 mt-2">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback>{driver.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{driver.name}</h1>
                            <Badge variant="secondary" className={statusColors[driver.status]}>{driver.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{driver.email}</p>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><MessageSquare className="mr-2"/> Message</Button>
                    <Button variant="outline"><Edit className="mr-2"/> Edit</Button>
                    <Button variant="destructive"><ShieldOff className="mr-2"/> Suspend</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {driver.stats.map(stat => (
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
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Driver Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{driver.location}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span>Joined {driver.joinDate}</span></div>
                        <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-muted-foreground" /> <span>{driver.vehicle}</span></div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Earnings</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {driver.recentJobs.map(job => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium">{job.id}</TableCell>
                                        <TableCell>
                                            <span className={jobStatusColors[job.status]}>{job.status}</span>
                                        </TableCell>
                                        <TableCell className="text-right">{job.earnings}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Overall performance scores based on historical data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="mb-1 flex justify-between items-baseline">
                            <Label>On-Time Arrival</Label>
                            <span className="text-sm font-bold">{driver.performance.onTimeArrival}%</span>
                        </div>
                        <Progress value={driver.performance.onTimeArrival} />
                    </div>
                     <div>
                        <div className="mb-1 flex justify-between items-baseline">
                            <Label>Positive Customer Ratings</Label>
                            <span className="text-sm font-bold">{driver.performance.customerRating}%</span>
                        </div>
                        <Progress value={driver.performance.customerRating} />
                    </div>
                    <div>
                        <div className="mb-1 flex justify-between items-baseline">
                            <Label>Job Acceptance Rate</Label>
                            <span className="text-sm font-bold">{driver.performance.acceptanceRate}%</span>
                        </div>
                        <Progress value={driver.performance.acceptanceRate} />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
