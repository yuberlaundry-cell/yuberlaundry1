
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
  MoreHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';

const invoices = [
    { id: 'INV-ACME-001', company: 'Acme Corp', date: 'Dec 1, 2024', amount: 'R42,500.00', status: 'Paid' },
    { id: 'INV-STARK-023', company: 'Stark Industries', date: 'Dec 1, 2024', amount: 'R128,800.00', status: 'Paid' },
    { id: 'INV-WAYNE-045', company: 'Wayne Enterprises', date: 'Dec 5, 2024', amount: 'R85,500.00', status: 'Due' },
    { id: 'INV-OSCORP-007', company: 'Oscorp', date: 'Nov 15, 2024', amount: 'R32,200.00', status: 'Overdue' },
    { id: 'INV-CYBER-001', company: 'Cyberdyne Systems', date: 'Dec 10, 2024', amount: 'R65,000.00', status: 'Due' },
];

const statusColors: { [key: string]: string } = {
  Paid: 'bg-green-100 text-green-800',
  Due: 'bg-amber-100 text-amber-800',
  Overdue: 'bg-red-100 text-red-800',
};

export default function B2BBillingPage() {
    const router = useRouter();
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
              <div className="text-2xl font-bold">R182,700.00</div>
              <p className="text-xs text-muted-foreground">Across 3 invoices</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">1</div>
               <p className="text-xs text-muted-foreground">Totaling R32,200.00</p>
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
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} onClick={() => router.push(`/admin/billing/${invoice.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.company}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[invoice.status]}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => router.push(`/admin/billing/${invoice.id}`)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
