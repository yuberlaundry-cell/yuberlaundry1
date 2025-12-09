'use client';

import { Button } from '@/components/ui/button';
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
import { Search, PlusCircle, Play, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

const tasks = [
    { name: 'Cleanup:ArchiveOldOrders', frequency: '0 0 * * *', lastRun: '10h ago', nextRun: '14h', status: 'Success' },
    { name: 'Finance:SyncPayouts', frequency: '0 2 * * 1', lastRun: '6d ago', nextRun: '8h', status: 'Success' },
    { name: 'Data:GenerateWeeklyReport', frequency: '0 4 * * 1', lastRun: '6d ago', nextRun: '1d', status: 'Failed' },
    { name: 'Notifications:SendPromos', frequency: '*/15 * * * *', lastRun: '2m ago', nextRun: '13m', status: 'Success' },
];

const statusColors: { [key: string]: string } = {
    Success: 'bg-green-100 text-green-800',
    Failed: 'bg-red-100 text-red-800',
};


export default function TasksPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Task Schedules</h1>
          <p className="text-muted-foreground">
            Manage scheduled background tasks and cron jobs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2" /> New Task
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
                    placeholder="Search tasks..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Frequency (cron)</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Last Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.name}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell className="font-mono">{task.frequency}</TableCell>
                    <TableCell>{task.lastRun}</TableCell>
                    <TableCell>{task.nextRun}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[task.status]}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4"/>
                        </Button>
                         <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
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
