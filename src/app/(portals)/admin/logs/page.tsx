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
import { Search, ChevronDown, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';

const logs = [
    { ts: '2024-07-26 10:30:01', src: 'Orders API', sev: 'Info', msg: 'Order #YL12345 status changed to Washing' },
    { ts: '2024-07-26 10:29:55', src: 'Payments API', sev: 'Error', msg: 'Payment failed for user-123. Reason: Insufficient funds.' },
    { ts: '2024-07-26 10:29:40', src: 'Drivers API', sev: 'Info', msg: 'Driver user-driver-1 location updated.' },
    { ts: '2024-07-26 10:28:10', src: 'Auth API', sev: 'Warning', msg: 'Failed login attempt for unknown user.' },
];

const severityColors: { [key: string]: string } = {
    Info: 'bg-blue-100 text-blue-800',
    Warning: 'bg-amber-100 text-amber-800',
    Error: 'bg-red-100 text-red-800',
    Critical: 'bg-red-200 text-red-900 font-bold',
};

export default function LogsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Logs & Observability</h1>
        <p className="text-muted-foreground">
          Search and view platform-wide application logs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search logs..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <div className="flex items-center gap-2">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        Severity <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Info</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Warning</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Error</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Critical</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button variant="outline"><Download className="mr-2"/> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.ts}>
                    <TableCell className="font-mono text-xs">{log.ts}</TableCell>
                    <TableCell>{log.src}</TableCell>
                    <TableCell>
                        <Badge variant="secondary" className={severityColors[log.sev]}>
                            {log.sev}
                        </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{log.msg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
