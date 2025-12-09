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
import { Search, PlusCircle, Play, MoreHorizontal, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const tasks = [
  {
    name: 'Cleanup:ArchiveOldOrders',
    type: 'Data Hygiene',
    frequency: '0 0 * * *',
    lastRun: '10h ago',
    nextRun: '14h',
    status: 'Success',
    duration: '1.2s'
  },
  {
    name: 'Finance:SyncPayouts',
    type: 'Financial',
    frequency: '0 2 * * 1',
    lastRun: '6d ago',
    nextRun: '8h',
    status: 'Success',
    duration: '5.8s'
  },
  {
    name: 'Data:GenerateWeeklyReport',
    type: 'Reporting',
    frequency: '0 4 * * 1',
    lastRun: '6d ago',
    nextRun: '1d',
    status: 'Failed',
    duration: '30.1s'
  },
  {
    name: 'Notifications:SendPromos',
    type: 'Marketing',
    frequency: '*/15 * * * *',
    lastRun: '2m ago',
    nextRun: '13m',
    status: 'Success',
    duration: '0.3s'
  },
  {
    name: 'Compliance:CheckDriverDocs',
    type: 'Compliance',
    frequency: '0 1 * * *',
    lastRun: '10h ago',
    nextRun: '14h',
    status: 'Success',
    duration: '2.5s'
  },
];

const statusColors: { [key: string]: string } = {
  Success: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-800',
  Running: 'bg-blue-100 text-blue-800',
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
                <TableHead>Type</TableHead>
                <TableHead>Frequency (cron)</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Last Status</TableHead>
                <TableHead>Avg. Duration</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.name}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.type}</TableCell>
                  <TableCell className="font-mono text-xs">{task.frequency}</TableCell>
                  <TableCell>{task.lastRun}</TableCell>
                  <TableCell>{task.nextRun}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                            <DropdownMenuItem><Play className="mr-2 h-4 w-4"/> Run Now</DropdownMenuItem>
                            <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                             <DropdownMenuItem className="text-destructive">Disable Task</DropdownMenuItem>
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
