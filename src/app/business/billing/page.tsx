
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockInvoices } from "@/lib/mock-data";
import { DollarSign, CreditCard, Calendar, CheckCircle, FileText, Settings, Download } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const kpiCards = [
    { title: "Outstanding Balance", value: "R0.00", icon: DollarSign },
    { title: "Last Invoice Amount", value: "R4,250.00", icon: FileText },
    { title: "Next Billing Date", value: "Jan 1, 2025", icon: Calendar },
];

const statusColors: { [key: string]: string } = {
    Paid: 'bg-green-100 text-green-800',
    Due: 'bg-amber-100 text-amber-800',
    Overdue: 'bg-red-100 text-red-800',
};

export default function BillingPage() {
    const { user } = useAuth();
    const router = useRouter();

    if (user?.role !== 'business_admin') {
        // Or redirect to a 'not authorized' page
        router.push('/business');
        return null;
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Billing Overview</h1>
                <p className="text-muted-foreground">Manage invoices, payments, and company billing information.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {kpiCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Invoices</CardTitle>
                                <CardDescription>A summary of your most recent billing statements.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/business/billing/invoices">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice #</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockInvoices.slice(0, 3).map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">
                                                <Link href={`/business/billing/invoices/${invoice.id}`} className="hover:underline">{invoice.id}</Link>
                                            </TableCell>
                                            <TableCell>{invoice.date}</TableCell>
                                            <TableCell>R{invoice.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={statusColors[invoice.status]}>{invoice.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/business/billing/invoices/${invoice.id}`}>
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Download</span>
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-1">
                                <p className="font-semibold text-lg">Business Pro</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Up to 100 employees</span>
                                </div>
                             </div>
                            <Button variant="outline" className="w-full">Manage Plan</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                                </div>
                            </div>
                             <Button variant="outline" className="w-full" asChild>
                                <Link href="/business/billing/payment-methods">
                                    <Settings className="mr-2 h-4 w-4" /> Manage Methods
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
