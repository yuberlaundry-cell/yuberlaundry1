'use client';

import { Button } from '@/components/ui/button';
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
import { Search, PlusCircle, Play, SlidersHorizontal, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const workflows = [
  {
    name: 'SLA: High-Priority Ticket',
    type: 'SLA',
    trigger: 'Event: ticket.created',
    lastRun: '2 mins ago',
    nextRun: 'N/A',
    status: 'Active',
  },
  {
    name: 'Assign Driver (London)',
    type: 'Assignment',
    trigger: 'Event: order.ready_for_pickup',
    lastRun: '5 mins ago',
    nextRun: 'N/A',
    status: 'Active',
  },
  {
    name: 'Deactivate Dormant Users',
    type: 'Cleanup',
    trigger: 'Time: Every 24h',
    lastRun: '14 hours ago',
    nextRun: '10 hours',
    status: 'Active',
  },
   {
    name: 'New Year Promotion',
    type: 'Promo Rule',
    trigger: 'Time: 2025-01-01 00:00 UTC',
    lastRun: 'N/A',
    nextRun: '2 weeks',
    status: 'Inactive',
  },
   {
    name: 'Fraud: Review High-Value First Order',
    type: 'Fraud',
    trigger: 'Event: order.created > $100',
    lastRun: '1 hour ago',
    nextRun: 'N/A',
    status: 'Active',
  },
];

const statusColors: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
    Error: 'bg-red-100 text-red-800',
};


export default function AutomationPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Automation & Workflows</h1>
          <p className="text-muted-foreground">
            Manage automated workflows, SLA timers, and operational rules.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
            <SlidersHorizontal className="mr-2" /> Manage SLAs
          </Button>
          <Button>
            <PlusCircle className="mr-2" /> New Workflow
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search workflows..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Status</TableHead>
                   <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((flow) => (
                  <TableRow key={flow.name}>
                    <TableCell className="font-medium">{flow.name}</TableCell>
                    <TableCell>{flow.type}</TableCell>
                    <TableCell className="font-mono text-xs">{flow.trigger}</TableCell>
                    <TableCell>{flow.lastRun}</TableCell>
                    <TableCell>{flow.nextRun}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[flow.status]}>
                        {flow.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                             <DropdownMenuContent align="end">
                                <DropdownMenuItem><Play className="mr-2 h-4 w-4"/> Run Now</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Logs</DropdownMenuItem>
                                 <DropdownMenuItem className="text-destructive">Disable</DropdownMenuItem>
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
