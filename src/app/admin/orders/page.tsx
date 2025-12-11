
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
  MoreHorizontal,
  Search,
  ChevronDown,
  Download,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { mockOrders } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const statusColors: { [key: string]: string } = {
  'upcoming': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-gray-100 text-gray-800',
};

export default function AdminOrdersPage() {
  const { toast } = useToast();

  const handleRefund = (e: React.FormEvent<HTMLFormElement>, orderId: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get('refund-amount') as string;
    
    toast({
        title: "Refund Initiated via Paystack",
        description: `A ${amount ? `partial refund of $${amount}` : 'full refund'} for order ${orderId} has been successfully initiated.`,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Orders Control</h1>
          <p className="text-muted-foreground">Monitor and manage all transactions on the platform.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by order, customer, or transaction ID..."
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
                        <DropdownMenuItem>Upcoming</DropdownMenuItem>
                        <DropdownMenuItem>In Progress</DropdownMenuItem>
                        <DropdownMenuItem>Completed</DropdownMenuItem>
                        <DropdownMenuItem>Cancelled</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.driver?.name || 'Jane Doe'}</TableCell>
                  <TableCell>{order.pickupTime.split(',')[0]}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[order.statusCategory]}>{order.status}</Badge>
                   </TableCell>
                   <TableCell className="text-right">{order.price}</TableCell>
                   <TableCell>
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Order Details</DropdownMenuItem>
                                     <DialogTrigger asChild>
                                        <DropdownMenuItem disabled={order.statusCategory === 'cancelled' || order.statusCategory === 'upcoming'}>
                                            Refund Order
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Refund Order {order.id}</DialogTitle>
                                    <DialogDescription>
                                        Initiate a full or partial refund via Paystack. Refunds are returned to the customer's original payment method.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={(e) => {
                                    handleRefund(e, order.id);
                                    const closeButton = e.currentTarget.closest('.sm\\:rounded-lg')?.querySelector('button[aria-label="Close"]');
                                    if(closeButton) (closeButton as HTMLButtonElement).click();
                                }}>
                                    <div className="space-y-2">
                                        <Label htmlFor="refund-amount">Refund Amount (Optional)</Label>
                                        <Input id="refund-amount" name="refund-amount" type="number" placeholder={`Full amount: ${order.price}`} />
                                        <p className="text-xs text-muted-foreground">Leave blank to process a full refund.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="refund-reason">Reason for Refund</Label>
                                        <Textarea id="refund-reason" name="refund-reason" placeholder="e.g., Customer reported damaged item." required />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Submit Refund</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
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
