
'use client';

import {
  Card,
  CardContent,
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
import { PlusCircle, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const plans = [
    { name: 'Yuber Plus (Monthly)', price: '$45.00/mo', activeSubscribers: 1250, status: 'Active'},
    { name: 'Yuber Plus (Annual)', price: '$450.00/yr', activeSubscribers: 320, status: 'Active'},
    { name: 'Business Pro', price: '$200.00/mo', activeSubscribers: 45, status: 'Active'},
    { name: 'Legacy Student Plan', price: '$25.00/mo', activeSubscribers: 0, status: 'Retired'},
]

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Retired: 'bg-gray-100 text-gray-800',
};


export default function PromotionsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Create and manage subscription plans and membership tiers.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2" /> New Plan
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search plans..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Status: All <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Active</DropdownMenuItem>
                  <DropdownMenuItem>Retired</DropdownMenuItem>
                  <DropdownMenuItem>Test-only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Active Subscribers</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.name} className="cursor-pointer">
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                   <TableCell>{plan.activeSubscribers.toLocaleString()}</TableCell>
                  <TableCell>
                     <Badge variant="secondary" className={statusColors[plan.status]}>
                      {plan.status}
                    </Badge>
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
