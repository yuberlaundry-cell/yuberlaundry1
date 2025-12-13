
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
  MoreHorizontal,
  PlusCircle,
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { NewLaundromatForm } from '@/components/admin/laundromats/new-laundromat-form';

const laundromats = [
    { id: 'L-001', name: 'Speedy Suds', location: 'London, UK', status: 'Active', activeOrders: 25, issueRate: '1.2%', rating: 4.8 },
    { id: 'L-002', name: 'Main St. Laundry', location: 'Manchester, UK', status: 'Active', activeOrders: 18, issueRate: '0.8%', rating: 4.9 },
    { id: 'L-003', name: 'Fresh Folds', location: 'London, UK', status: 'Inactive', activeOrders: 0, issueRate: '3.5%', rating: 3.5 },
    { id: 'L-004', name: 'City Cleaners', location: 'Birmingham, UK', status: 'Active', activeOrders: 32, issueRate: '0.5%', rating: 5.0 },
    { id: 'L-005', name: 'The Wash House', location: 'Glasgow, UK', status: 'Onboarding', activeOrders: 0, issueRate: 'N/A', rating: 0 },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Onboarding: 'bg-blue-100 text-blue-800',
};


export default function LaundromatsPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleGenericAction = (action: string, laundromatName: string) => {
        toast({
            title: `${action} Initiated`,
            description: `The action '${action}' for laundromat ${laundromatName} has been triggered.`,
        });
    };

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Laundromats</h1>
                <p className="text-muted-foreground">Manage and monitor all partner facilities.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                     <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Laundromat
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                     <DialogHeader>
                        <DialogTitle>Onboard New Laundromat</DialogTitle>
                         <DialogDescription>
                            Follow these steps to add a new partner facility to the platform.
                        </DialogDescription>
                     </DialogHeader>
                    <NewLaundromatForm />
                </DialogContent>
            </Dialog>
        </div>

      <Card>
         <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name or location..."
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
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                    <DropdownMenuItem>Onboarding</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Orders</TableHead>
                <TableHead>Issue Rate</TableHead>
                <TableHead>Avg. Rating</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laundromats.map((l) => (
                <TableRow key={l.id} className="cursor-pointer" onClick={() => router.push(`/admin/laundromats/${l.id}`)}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.location}</TableCell>
                   <TableCell>
                    <Badge variant="secondary" className={statusColors[l.status]}>{l.status}</Badge>
                   </TableCell>
                   <TableCell>{l.activeOrders}</TableCell>
                   <TableCell>{l.issueRate}</TableCell>
                   <TableCell>{l.rating > 0 ? l.rating.toFixed(1) : 'N/A'}</TableCell>
                   <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => router.push(`/admin/laundromats/${l.id}`)}>View Dashboard</DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => { e.stopPropagation(); handleGenericAction('Edit Details', l.name)}}>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => { e.stopPropagation(); handleGenericAction('Deactivate', l.name)}}>Deactivate</DropdownMenuItem>
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
