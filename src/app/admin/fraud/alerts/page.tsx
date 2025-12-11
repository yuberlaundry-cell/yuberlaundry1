
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
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const newAlerts = [
    { id: 'F-097', user: 'john.smith@example.com', rule: 'Unusual Location', score: 72, date: '1 hour ago' },
    { id: 'F-095', user: 'new.user@example.com', rule: 'New Account High Value Order', score: 68, date: '5 hours ago' },
];

export default function NewFraudAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          New Fraud Alerts
        </h1>
        <p className="text-muted-foreground">
          A list of new, unreviewed fraud alerts that require attention.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>New Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User / Entity</TableHead>
                <TableHead>Triggered Rule</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.user}</TableCell>
                  <TableCell>{alert.rule}</TableCell>
                   <TableCell>
                        <Badge variant={alert.score > 80 ? 'destructive' : 'secondary'}>{alert.score}</Badge>
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
                                <DropdownMenuItem>Start Review</DropdownMenuItem>
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
