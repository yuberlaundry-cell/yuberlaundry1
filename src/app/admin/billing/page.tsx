
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
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Download,
  FileText,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const invoices = [
    { id: 'INV-ACME-001', company: 'Acme Corp', date: 'Dec 1, 2024', amount: '$4,250.00', status: 'Paid' },
    { id: 'INV-STARK-023', company: 'Stark Industries', date: 'Dec 1, 2024', amount: '$12,800.00', status: 'Paid' },
    { id: 'INV-WAYNE-045', company: 'Wayne Enterprises', date: 'Dec 5, 2024', amount: '$8,500.00', status: 'Due' },
    { id: 'INV-OSCORP-007', company: 'Oscorp', date: 'Nov 15, 2024', amount: '$3,200.00', status: 'Overdue' },
];

const statusColors: { [key: string]: string } = {
  Paid: 'bg-green-100 text-green-800',
  Due: 'bg-amber-100 text-amber-800',
  Overdue: 'bg-red-100 text-red-800',
};

export default function B2BBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">B2B Billing</h1>
          <p className="text-muted-foreground">
            Manage corporate invoices and payments.
          </p>
        </div>
      </div>
      
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$11,700.00</div>
              <p className="text-xs text-muted-foreground">Across 2 invoices</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">1</div>
               <p className="text-xs text-muted-foreground">Totaling $3,200.00</p>
            </CardContent>
          </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by company or invoice ID..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[350px]"
                />
            </div>
             <div className="flex items-center gap-2">
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
                 <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.company}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[invoice.status]}>{invoice.status}</Badge>
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
