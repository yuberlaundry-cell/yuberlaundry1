'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockInvoices } from "@/lib/mock-data";
import { Download, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

const statusColors: { [key: string]: string } = {
    Paid: 'bg-green-100 text-green-800',
    Due: 'bg-amber-100 text-amber-800',
    Overdue: 'bg-red-100 text-red-800',
};

export default function InvoicesListPage() {
    const router = useRouter();
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Invoices</h1>
                <p className="text-muted-foreground">View and download your company's billing history.</p>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 justify-between p-6">
                     <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search by invoice number..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-auto">
                                Status: All <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>All</DropdownMenuItem>
                                <DropdownMenuItem>Paid</DropdownMenuItem>
                                <DropdownMenuItem>Due</DropdownMenuItem>
                                <DropdownMenuItem>Overdue</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <Popover>
                            <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Date: All time <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="range" />
                            </PopoverContent>
                        </Popover>
                         <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>
                </div>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockInvoices.map((invoice) => (
                                <TableRow key={invoice.id} className="cursor-pointer" onClick={() => router.push(`/business/billing/invoices/${invoice.id}`)}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.dueDate}</TableCell>
                                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={statusColors[invoice.status]}>{invoice.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/business/billing/invoices/${invoice.id}`} onClick={(e) => e.stopPropagation()}>
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
    );
}
