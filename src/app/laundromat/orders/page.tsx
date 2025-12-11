
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ChevronDown,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';

const mockOrders = [
    {id: '#YL12345', customer: 'Jane Doe', status: 'Washing', service: 'Wash & Fold', pickup: 'Today, 10am', sla: 'Due in 3h'},
    {id: '#YL12346', customer: 'John Smith', status: 'Folding/QC', service: 'Dry Cleaning', pickup: 'Today, 9am', sla: 'Due in 1h'},
    {id: '#YL12347', customer: 'Acme Corp', status: 'Ready', service: 'Wash & Fold', pickup: 'Yesterday', sla: 'Completed'},
    {id: '#YL12348', customer: 'Peter Pan', status: 'Drying', service: 'Ironing', pickup: 'Today, 11am', sla: 'Due in 5h'},
    {id: '#YL12349', customer: 'Mary Poppins', status: 'Intake', service: 'Wash & Fold', pickup: 'Today, 1pm', sla: 'Due in 24h'},
];

const statusColors: { [key: string]: string } = {
  'Ready': 'bg-green-100 text-green-800',
  'Washing': 'bg-blue-100 text-blue-800',
  'Drying': 'bg-blue-100 text-blue-800',
  'Folding/QC': 'bg-purple-100 text-purple-800',
  'Intake': 'bg-gray-100 text-gray-800',
};

const OrderRow = ({ order }: { order: typeof mockOrders[0]}) => {
    const router = useRouter();
    return (
        <TableRow
            key={order.id}
            className="hidden md:table-row cursor-pointer"
            onClick={() =>
                router.push(`/laundromat/orders/${order.id.replace("#","")}`)
            }
        >
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.service}</TableCell>
            <TableCell>
            <Badge variant="secondary" className={statusColors[order.status]}>
                {order.status}
            </Badge>
            </TableCell>
            <TableCell>{order.pickup}</TableCell>
            <TableCell>{order.sla}</TableCell>
        </TableRow>
    )
}

const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => {
    const router = useRouter();
    return (
        <Card className="md:hidden" onClick={() => router.push(`/laundromat/orders/${order.id.replace("#","")}`)}>
             <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{order.id}</CardTitle>
                     <Badge variant="secondary" className={statusColors[order.status]}>
                        {order.status}
                    </Badge>
                </div>
                <CardDescription>{order.customer}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
                <p><span className="font-medium">Service:</span> {order.service}</p>
                <p><span className="font-medium">Pickup:</span> {order.pickup}</p>
                <p><span className="font-medium">SLA:</span> {order.sla}</p>
            </CardContent>
        </Card>
    )
}


export default function LaundromatOrdersPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Facility Orders</h1>
        <p className="text-muted-foreground">
          Search and manage all orders assigned to this facility.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID or customer..."
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
                  <DropdownMenuItem>Incoming</DropdownMenuItem>
                  <DropdownMenuItem>In Intake</DropdownMenuItem>
                  <DropdownMenuItem>Washing</DropdownMenuItem>
                  <DropdownMenuItem>Drying</DropdownMenuItem>
                  <DropdownMenuItem>Folding/QC</DropdownMenuItem>
                   <DropdownMenuItem>Ready</DropdownMenuItem>
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto hidden md:block">
            <table className="w-full caption-bottom text-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pickup</TableHead>
                        <TableHead>SLA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockOrders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                </TableBody>
            </table>
          </div>
          <div className="grid gap-4 md:hidden">
              {mockOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
