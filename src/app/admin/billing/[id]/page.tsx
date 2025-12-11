
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
  TableFooter
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Download,
    Mail,
    CheckCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const invoices = [
    { id: 'INV-ACME-001', company: 'Acme Corp', date: 'Dec 1, 2024', dueDate: 'Dec 15, 2024', amount: '42,500.00', status: 'Paid' },
    { id: 'INV-STARK-023', company: 'Stark Industries', date: 'Dec 1, 2024', dueDate: 'Dec 15, 2024', amount: '128,800.00', status: 'Paid' },
    { id: 'INV-WAYNE-045', company: 'Wayne Enterprises', date: 'Dec 5, 2024', dueDate: 'Dec 20, 2024', amount: '85,500.00', status: 'Due' },
    { id: 'INV-OSCORP-007', company: 'Oscorp', date: 'Nov 15, 2024', dueDate: 'Nov 30, 2024', amount: '32,200.00', status: 'Overdue' },
    { id: 'INV-CYBER-001', company: 'Cyberdyne Systems', date: 'Dec 10, 2024', dueDate: 'Dec 25, 2024', amount: '65,000.00', status: 'Due' },
];

const statusColors: { [key: string]: string } = {
  Paid: 'bg-green-100 text-green-800',
  Due: 'bg-amber-100 text-amber-800',
  Overdue: 'bg-red-100 text-red-800',
};


export default function B2BInvoiceDetailPage() {
    const params = useParams();
    const invoiceId = params.id;
    const invoice = invoices.find(inv => inv.id === invoiceId);

    if (!invoice) {
        return (
            <div>
                <Button variant="ghost" asChild>
                    <Link href="/admin/billing"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Billing</Link>
                </Button>
                <div className="text-center py-12">Invoice not found.</div>
            </div>
        );
    }
    
  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/admin/billing">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Billing
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl mt-2">Invoice {invoice.id}</h1>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline"><Mail className="mr-2 h-4 w-4"/> Send Reminder</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download PDF</Button>
                {invoice.status !== 'Paid' && <Button><CheckCircle className="mr-2 h-4 w-4"/> Mark as Paid</Button>}
            </div>
        </div>

        <Card className="p-6">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg">Yuber Laundry</h3>
                        <p className="text-muted-foreground text-sm">
                            123 Laundry Lane<br/>
                            London, SW1A 0AA<br/>
                            United Kingdom
                        </p>
                    </div>
                    <div className="md:text-right">
                            <h3 className="font-bold text-lg">Billed to {invoice.company}</h3>
                        <p className="text-muted-foreground text-sm">
                            456 Corporate Ave<br/>
                            London, EC2R 8DE<br/>
                            United Kingdom
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8 text-center md:text-left">
                    <Card className="p-4">
                        <CardDescription>Issue Date</CardDescription>
                        <CardTitle>{invoice.date}</CardTitle>
                    </Card>
                        <Card className="p-4">
                        <CardDescription>Due Date</CardDescription>
                        <CardTitle>{invoice.dueDate}</CardTitle>
                    </Card>
                    <Card className="p-4">
                        <CardDescription>Status</CardDescription>
                        <CardTitle>
                            <Badge variant="secondary" className={`text-base ${statusColors[invoice.status]}`}>{invoice.status}</Badge>
                        </CardTitle>
                    </Card>
                </div>

                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Company Laundry Services ({invoice.date.split(',')[0]})</TableCell>
                            <TableCell className="text-right">R{invoice.amount}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow className="font-bold text-lg">
                            <TableCell className="text-right">Total Amount</TableCell>
                            <TableCell className="text-right">R{invoice.amount}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

