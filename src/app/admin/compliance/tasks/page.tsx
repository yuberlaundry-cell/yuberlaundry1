
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
import { Checkbox } from '@/components/ui/checkbox';

const complianceTasks = [
    { id: 'T-098', title: 'Review Driver D-45 background check', priority: 'High', due: '2 days', status: 'Overdue' },
    { id: 'T-097', title: 'Audit Laundromat L-12 chemical storage', priority: 'Medium', due: '1 week', status: 'Open' },
    { id: 'T-096', title: 'Verify warehouse W-02 fire safety certificate', priority: 'High', due: 'overdue', status: 'Overdue' },
    { id: 'T-095', title: 'Follow up on customer complaint for order #YL5829', priority: 'Low', due: '3 weeks', status: 'Open' },
];

export default function ComplianceTasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          Compliance Tasks
        </h1>
        <p className="text-muted-foreground">
          Manage and track all open compliance-related tasks.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Open Tasks</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]"><span className="sr-only">Complete</span></TableHead>
                        <TableHead>Task Description</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {complianceTasks.map(task => (
                        <TableRow key={task.id}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>
                                <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'secondary' : 'outline'}>
                                    {task.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>{task.due}</TableCell>
                             <TableCell>
                                <Badge variant={task.status === 'Overdue' ? 'destructive' : 'secondary'}>
                                    {task.status}
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
