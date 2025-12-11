
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Printer, Banknote, Landmark, Percent, FileText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const payoutData = {
    id: 'PAY-24-05-15',
    date: 'May 15, 2024',
    period: 'May 1 - May 14, 2024',
    status: 'Completed',
    totalOrders: 152,
    grossEarnings: 2718.24,
    commission: -407.74,
    netPayout: 2310.50
};

const orders = [
    { id: '#YL12345', date: 'May 1, 2024', service: 'Wash & Fold', amount: 25.50 },
    { id: '#YL12346', date: 'May 1, 2024', service: 'Dry Cleaning', amount: 42.00 },
    { id: '#YL12347', date: 'May 2, 2024', service: 'Wash & Fold', amount: 31.20 },
];

const statusColors: { [key: string]: string } = {
  Completed: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
  Failed: 'bg-red-100 text-red-800',
};


export default function PayoutDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const payoutId = params.id as string;
    const payout = payoutData;

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/laundromat/financials">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all payouts
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        Payout {payout.id} 
                    </h1>
                     <p className="text-muted-foreground mt-1">
                        For period: {payout.period}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                    <Button><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableRow className="border-0">
                                    <TableCell className="font-medium flex items-center gap-2"><Banknote/> Gross Earnings</TableCell>
                                    <TableCell className="text-right">${payout.grossEarnings.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2 text-muted-foreground pl-10"><FileText/> From {payout.totalOrders} orders</TableCell>
                                    <TableCell className="text-right text-muted-foreground">${payout.grossEarnings.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium flex items-center gap-2 text-muted-foreground pl-10"><Percent/> Platform Commission (15%)</TableCell>
                                    <TableCell className="text-right text-muted-foreground">-${Math.abs(payout.commission).toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow className="font-bold text-lg border-t-2">
                                    <TableCell>Net Payout</TableCell>
                                    <TableCell className="text-right">${payout.netPayout.toFixed(2)}</TableCell>
                                </TableRow>
                            </Table>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Orders in this Payout ({orders.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">
                                                <Link href={`/laundromat/orders/${order.id.replace('#', '')}`} className="hover:underline text-primary">
                                                    {order.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.service}</TableCell>
                                            <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8 lg:sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle>Payout Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex justify-between items-center text-sm">
                                <p className="text-muted-foreground">Status</p>
                                <Badge variant="secondary" className={statusColors[payout.status]}>{payout.status}</Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p className="text-muted-foreground">Payout Date</p>
                                <p className="font-medium">{payout.date}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <Landmark className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold text-sm">Paid to Main Street Bank</p>
                                    <p className="text-xs text-muted-foreground">Acct ending in ****5678</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}
