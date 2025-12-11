
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
import { Star, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const completedOrders = [
  {
    orderId: '#YL12347',
    customer: 'Acme Corp',
    service: 'Wash & Fold',
    completedDate: 'Today',
    rating: 5,
  },
  {
    orderId: '#YL12344',
    customer: 'Jane Doe',
    service: 'Wash & Fold',
    completedDate: 'Yesterday',
    rating: 4,
  },
  {
    orderId: '#YL12343',
    customer: 'John Smith',
    service: 'Dry Cleaning',
    completedDate: 'Yesterday',
    rating: 5,
  },
];

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
          <CardHeader>
            <CardTitle>Total Completed</CardTitle>
            <CardDescription>256</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
            <CardDescription className="flex items-center gap-1">
              4.8 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Positive Feedback</CardTitle>
            <CardDescription>99.2%</CardDescription>
          </CardHeader>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.completedDate}</TableCell>
                  <TableCell>
                    <RatingStars rating={order.rating} />
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
