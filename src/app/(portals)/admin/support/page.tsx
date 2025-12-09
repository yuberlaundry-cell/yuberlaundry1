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
import {
  Search,
  ChevronDown,
  PlusCircle,
  FileQuestion,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const tickets = [
  {
    id: 'TKT-001',
    customer: 'Jane Doe',
    subject: 'Missing sock from order #YL12344',
    status: 'Open',
    priority: 'Medium',
    lastUpdate: '2 hours ago',
    agent: 'Support Team',
  },
  {
    id: 'TKT-002',
    customer: 'John Smith',
    subject: 'Billing question about INV-2024-011',
    status: 'New',
    priority: 'Low',
    lastUpdate: '1 day ago',
    agent: 'Unassigned',
  },
];

const statusColors: { [key: string]: string } = {
  New: 'bg-blue-100 text-blue-800',
  Open: 'bg-amber-100 text-amber-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800',
};

const priorityColors: { [key: string]: string } = {
  Low: 'bg-gray-100 text-gray-800',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-red-100 text-red-800',
};

export default function SupportCenterPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Support Center</h1>
          <p className="text-muted-foreground">
            Manage and resolve all customer, driver, and laundromat issues.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2" /> New Ticket
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
                placeholder="Search tickets..."
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
                  <DropdownMenuItem>New</DropdownMenuItem>
                  <DropdownMenuItem>Open</DropdownMenuItem>
                  <DropdownMenuItem>Resolved</DropdownMenuItem>
                  <DropdownMenuItem>Closed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Priority: All <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Low</DropdownMenuItem>
                  <DropdownMenuItem>Medium</DropdownMenuItem>
                  <DropdownMenuItem>High</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Agent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="cursor-pointer"
                    onClick={() => {
                      /* Navigate to ticket details */
                    }}
                  >
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[ticket.status]}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={priorityColors[ticket.priority]}
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell>{ticket.agent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-secondary rounded-full p-4">
                        <FileQuestion className="h-8 w-8 text-muted-foreground" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold">You're all caught up!</h3>
                <p className="text-muted-foreground">No open tickets at the moment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
