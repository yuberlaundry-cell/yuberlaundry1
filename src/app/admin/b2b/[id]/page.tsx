
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
    DollarSign,
    Edit,
    FileText,
    ShoppingCart,
    Users,
    ShieldOff,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const companyData = {
    'acme-corp': {
        name: 'Acme Corp',
        status: 'Active',
        stats: [
            { label: 'Total Spend', value: 'R150,500', icon: DollarSign },
            { label: 'Total Orders', value: '450', icon: ShoppingCart },
            { label: 'Active Employees', value: '75', icon: Users },
        ],
        recentOrders: [
            { id: '#YLB-101', employee: 'Jane Doe', amount: 'R250.00', date: '2024-05-10' },
            { id: '#YLB-102', employee: 'John Smith', amount: 'R180.50', date: '2024-05-09' },
        ],
        spendData: [
            { month: 'Jan', spend: 20000 },
            { month: 'Feb', spend: 22000 },
            { month: 'Mar', spend: 25000 },
            { month: 'Apr', spend: 23000 },
            { month: 'May', spend: 28000 },
            { month: 'Jun', spend: 30000 },
        ],
    }
};

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Onboarding: 'bg-blue-100 text-blue-800',
};

const chartConfig = {
  spend: {
    label: 'Spend',
    color: 'hsl(var(--primary))',
  },
};

export default function CompanyProfilePage() {
    const params = useParams();
    const router = useRouter();
    const companyId = params.id as keyof typeof companyData;
    const company = companyData[companyId] || companyData['acme-corp'];

    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/admin/b2b">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to B2B Accounts
                    </Link>
                </Button>
                 <div className="flex items-center gap-4 mt-2">
                    <div className="bg-muted p-3 rounded-lg">
                        <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold font-headline">{company.name}</h1>
                            <Badge variant="secondary" className={statusColors[company.status]}>{company.status}</Badge>
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><FileText className="mr-2"/> View Contract</Button>
                    <Button variant="outline"><Edit className="mr-2"/> Edit Company</Button>
                    <Button variant="destructive"><ShieldOff className="mr-2"/> Suspend</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {company.stats.map(stat => (
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
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Spend Over Time</CardTitle>
                        <CardDescription>Monthly spend for the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <BarChart accessibilityLayer data={company.spendData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="spend" fill="var(--color-spend)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                         <CardDescription>
                            Latest orders from this company.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Employee</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {company.recentOrders.map(job => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/admin/orders/${job.id.replace('#YLB-', '')}`} className="hover:underline">
                                                {job.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{job.employee}</TableCell>
                                        <TableCell className="text-right">{job.amount}</TableCell>
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
