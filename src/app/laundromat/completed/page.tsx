
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { Star, Filter, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function CompletedOrdersPage() {
  const { orders } = useLaundromatOrders();
  const router = useRouter();
  
  const completedOrders = useMemo(() => orders.filter(o => o.status === 'Completed'), [orders]);

  const totalCompleted = completedOrders.length;
  const averageRating = useMemo(() => {
    if (completedOrders.length === 0) return 0;
    const ratedOrders = completedOrders.filter(o => o.rating);
    if (ratedOrders.length === 0) return 0;
    const totalRating = ratedOrders.reduce((acc, order) => acc + (order.rating || 0), 0);
    return totalRating / ratedOrders.length;
  }, [completedOrders]);
  const positiveFeedback = useMemo(() => {
    if (completedOrders.length === 0) return 0;
    const ratedOrders = completedOrders.filter(o => o.rating);
    if (ratedOrders.length === 0) return 0;
    const positiveReviews = ratedOrders.filter(o => o.rating && o.rating >= 4).length;
    return (positiveReviews / ratedOrders.length) * 100;
  }, [completedOrders]);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Completed Orders & Reviews
        </h1>
        <p className="text-muted-foreground">
          View history of completed jobs and customer feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
          </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{positiveFeedback.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Order History</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>5 Stars</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>4 Stars</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>3 Stars or less</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date Completed</TableHead>
                    <TableHead>Review</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {completedOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/laundromat/orders/${order.id.replace('#','')}`)}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>{order.readyTime || new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                        {order.rating ? (
                            <div>
                                <RatingStars rating={order.rating} />
                                {order.reviewDate && <p className="text-xs text-muted-foreground">Rated on {order.reviewDate}</p>}
                            </div>
                        ) : <span className="text-muted-foreground">N/A</span>}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:hidden">
              {completedOrders.map(order => (
                  <Card key={order.id} onClick={() => router.push(`/laundromat/orders/${order.id.replace('#','')}`)}>
                      <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{order.id}</CardTitle>
                            {order.rating ? <RatingStars rating={order.rating} /> : <span className="text-xs text-muted-foreground">No rating</span>}
                          </div>
                          <CardDescription>{order.customer}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                          <p><span className="font-medium">Service:</span> {order.service}</p>
                          <p><span className="font-medium">Completed:</span> {order.readyTime}</p>
                      </CardContent>
                  </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
