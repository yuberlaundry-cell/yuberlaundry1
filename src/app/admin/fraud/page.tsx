

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
  ShieldAlert,
  Search,
  ChevronDown,
  FileWarning,
  UserCheck,
  Ban,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const alerts = [
    { id: 'F-098', user: 'jane.doe@example.com', rule: 'High Frequency Orders', score: 85, status: 'Reviewing', date: '2 min ago' },
    { id: 'F-097', user: 'john.smith@example.com', rule: 'Unusual Location', score: 72, status: 'New', date: '1 hour ago' },
    { id: 'F-096', user: 'alex.ray@yuber.com', rule: 'Mismatched Addresses', score: 91, status: 'Resolved (False Positive)', date: '3 hours ago' },
    { id: 'F-095', user: 'new.user@example.com', rule: 'New Account High Value Order', score: 68, status: 'New', date: '5 hours ago' },
];

const statusColors: { [key: string]: string } = {
  New: 'bg-amber-100 text-amber-800',
  Reviewing: 'bg-blue-100 text-blue-800',
  'Resolved (False Positive)': 'bg-green-100 text-green-800',
};


export default function FraudMonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
            Fraud Monitoring
          </h1>
          <p className="text-muted-foreground">
            Monitor and investigate suspicious activity via Paystack Radar.
          </p>
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Alerts (24h)</CardTitle>
              <FileWarning className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accounts Blocked</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by user or rule..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[350px]"
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
                        <DropdownMenuItem>Reviewing</DropdownMenuItem>
                        <DropdownMenuItem>Resolved</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User / Entity</TableHead>
                <TableHead>Triggered Rule</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.user}</TableCell>
                  <TableCell>{alert.rule}</TableCell>
                   <TableCell>
                        <Badge variant={alert.score > 80 ? 'destructive' : 'secondary'}>{alert.score}</Badge>
                   </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[alert.status]}>{alert.status}</Badge>
                  </TableCell>
                  <TableCell>{alert.date}</TableCell>
                   <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Mark as False Positive</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
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
