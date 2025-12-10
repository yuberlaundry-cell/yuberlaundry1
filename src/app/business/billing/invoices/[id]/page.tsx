
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { mockInvoices } from "@/lib/mock-data";
import { ArrowLeft, CreditCard, Download, Mail, Printer } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const statusColors: { [key: string]: string } = {
    Paid: 'bg-green-100 text-green-800',
    Due: 'bg-amber-100 text-amber-800',
    Overdue: 'bg-red-100 text-red-800',
};

export default function InvoiceDetailsPage() {
    const params = useParams();
    const invoiceId = params.id as string;
    const invoice = mockInvoices.find(i => i.id === invoiceId);
    const { user } = useAuth();

    if (!invoice) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold">Invoice not found</h2>
                <Button variant="link" asChild><Link href="/business/billing/invoices">Return to list</Link></Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/billing/invoices">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all invoices
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        Invoice {invoice.id} 
                    </h1>
                     <p className="text-muted-foreground mt-1">
                        Issued on {invoice.date}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                    <Button><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                </div>
            </div>

            <Card className="p-6 sm:p-8">
                <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold text-lg font-headline">Yuber Laundry</h3>
                            <p className="text-muted-foreground text-sm">
                                123 Laundry Lane<br/>
                                London, SW1A 0AA<br/>
                                United Kingdom
                            </p>
                        </div>
                        <div className="md:text-right">
                             <h3 className="font-bold text-lg font-headline">Billed to {user?.companyName}</h3>
                             <p className="text-muted-foreground text-sm">
                                456 Corporate Ave<br/>
                                London, EC2R 8DE<br/>
                                United Kingdom
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">
                        <Card className="p-4">
                            <CardTitle className="text-sm font-semibold">Amount Due</CardTitle>
                            <CardDescription className="text-2xl font-bold">${invoice.status === 'Paid' ? '0.00' : invoice.amount.toFixed(2)}</CardDescription>
                        </Card>
                         <Card className="p-4">
                            <CardTitle className="text-sm font-semibold">Due Date</CardTitle>
                            <CardDescription className="text-2xl font-bold">{invoice.dueDate}</CardDescription>
                        </Card>
                        <Card className="p-4">
                            <CardTitle className="text-sm font-semibold">Status</CardTitle>
                            <CardDescription>
                                <Badge variant="secondary" className={`text-lg ${statusColors[invoice.status]}`}>{invoice.status}</Badge>
                            </CardDescription>
                        </Card>
                    </div>

                    <h3 className="font-semibold mb-4">Invoice Items</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoice.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.description}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                         <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                                <TableCell className="text-right">${invoice.subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell colSpan={3} className="text-right font-medium">Tax (0%)</TableCell>
                                <TableCell className="text-right">${invoice.tax.toFixed(2)}</TableCell>
                            </TableRow>
                             <TableRow className="font-bold text-lg">
                                <TableCell colSpan={3} className="text-right">Total</TableCell>
                                <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                     <Separator className="my-8" />
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                             <h4 className="font-semibold mb-2">Notes</h4>
                            <p className="text-sm text-muted-foreground">Thank you for your business. We appreciate your prompt payment.</p>
                        </div>
                        {invoice.status === 'Paid' ? (
                             <Card className="bg-green-50 border-green-200">
                                <CardContent className="p-4 flex items-center gap-4">
                                     <CreditCard className="h-6 w-6 text-green-700" />
                                     <div>
                                        <p className="font-semibold text-green-800">Paid on {invoice.date}</p>
                                        <p className="text-sm text-green-700">Payment via Visa ending in 4242.</p>
                                     </div>
                                </CardContent>
                            </Card>
                        ) : (
                             <Card className="bg-amber-50 border-amber-200">
                                <CardContent className="p-4">
                                    <h4 className="font-semibold text-amber-800 mb-2">Payment Options</h4>
                                     <p className="text-sm text-amber-700 mb-4">Payment will be automatically processed on the due date using the primary payment method on file.</p>
                                     <Button variant="outline">
                                        <Mail className="mr-2 h-4 w-4" /> Send Reminder
                                     </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
