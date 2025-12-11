
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const underReviewAlerts = [
    { id: 'F-098', user: 'jane.doe@example.com', rule: 'High Frequency Orders', score: 85, date: '2 min ago', reviewer: 'Sam Admin' },
];

export default function UnderReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          Alerts Under Review
        </h1>
        <p className="text-muted-foreground">
          Fraud alerts that are currently being investigated by an admin.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Under Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User / Entity</TableHead>
                <TableHead>Triggered Rule</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {underReviewAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.user}</TableCell>
                  <TableCell>{alert.rule}</TableCell>
                   <TableCell>
                        <Badge variant='destructive'>{alert.score}</Badge>
                   </TableCell>
                  <TableCell>{alert.date}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{alert.reviewer.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{alert.reviewer}</span>
                     </div>
                   </TableCell>
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
