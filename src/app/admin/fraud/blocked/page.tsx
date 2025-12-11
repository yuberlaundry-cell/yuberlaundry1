
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


const blockedAccounts = [
    { id: 'usr-456', user: 'blocked.user@example.com', reason: 'Credit Card Fraud (Radar)', date: 'May 12, 2024', reviewer: 'Sam Admin' },
];

export default function BlockedAccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          Blocked Accounts
        </h1>
        <p className="text-muted-foreground">
          A log of all users and entities blocked for fraudulent activity.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Blocked Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User / Entity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date Blocked</TableHead>
                <TableHead>Blocked By</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.user}</TableCell>
                  <TableCell>{account.reason}</TableCell>
                  <TableCell>{account.date}</TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{account.reviewer.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{account.reviewer}</span>
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
                                <DropdownMenuItem>Unblock Account</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                   </TableCell>
                </TableRow>
              ))}
               {blockedAccounts.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    No accounts have been blocked.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
