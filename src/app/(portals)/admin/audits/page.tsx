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
import { Search, ChevronDown, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const auditLogs = [
    { ts: '2024-07-26 14:10:02', actor: 'Sam Admin', entity: 'Driver: D-123', action: 'Compliance State Changed', details: 'Status set to `SUSPENDED` due to expired license.' },
    { ts: '2024-07-26 14:05:15', actor: 'System', entity: 'Order: #YL12345', action: 'SLA Breached', details: 'Processing time exceeded 24 hours.' },
    { ts: '2024-07-26 13:50:41', actor: 'john.smith@acmecorp.com', entity: 'Policy: Privacy v2.1', action: 'Policy Acknowledged', details: 'User acknowledged the latest privacy policy.' },
    { ts: '2024-07-26 12:00:00', actor: 'Sam Admin', entity: 'Feature Flag: Tipping', action: 'Flag Enabled', details: 'Tipping feature enabled for UK tenant.' },
];

export default function AuditsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Audit Logs</h1>
        <p className="text-muted-foreground">
          Track important actions taken by users and the system across the platform.
        </p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by actor, entity, or action..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <div className="flex items-center gap-2">
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline">
                        Date: All Time <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar mode="range" />
                    </PopoverContent>
                </Popover>
                 <Button variant="outline"><Download className="mr-2"/> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Action</TableHead>
                   <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.ts}>
                    <TableCell className="font-mono text-xs">{log.ts}</TableCell>
                    <TableCell className="font-medium">{log.actor}</TableCell>
                    <TableCell>{log.entity}</TableCell>
                    <TableCell>
                        <Badge variant="secondary">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
