
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';

const drivers = [
    { id: 'D-001', name: 'Alex Ray', location: 'London, UK', status: 'Online', activeJobs: 1, acceptanceRate: '98%', rating: 4.9, avatar: 'https://picsum.photos/seed/driver1/40/40' },
    { id: 'D-002', name: 'Sarah Johnson', location: 'Manchester, UK', status: 'Offline', activeJobs: 0, acceptanceRate: '95%', rating: 4.8, avatar: 'https://picsum.photos/seed/driver2/40/40' },
    { id: 'D-003', name: 'David Lee', location: 'London, UK', status: 'On a Job', activeJobs: 1, acceptanceRate: '99%', rating: 5.0, avatar: 'https://picsum.photos/seed/driver3/40/40' },
    { id: 'D-004', name: 'Maria Rodriguez', location: 'Birmingham, UK', status: 'Online', activeJobs: 0, acceptanceRate: '92%', rating: 4.7, avatar: 'https://picsum.photos/seed/driver4/40/40' },
    { id: 'D-005', name: 'Ken Watanabe', location: 'Glasgow, UK', status: 'New', activeJobs: 0, acceptanceRate: 'N/A', rating: 0, avatar: 'https://picsum.photos/seed/driver5/40/40' },
];

const statusColors: { [key: string]: string } = {
  Online: 'bg-green-100 text-green-800',
  Offline: 'bg-gray-100 text-gray-800',
  'On a Job': 'bg-blue-100 text-blue-800',
  New: 'bg-purple-100 text-purple-800',
};


export default function DriversPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleGenericAction = (action: string, driverName: string) => {
    toast({
        title: `${action} Initiated`,
        description: `The action '${action}' for driver ${driverName} has been triggered.`,
    });
  };
  
  const handleAddDriver = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Driver Added!",
            description: "The new driver has been created and can now log in.",
        });
        // In a real app, you would close the dialog here.
    }

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Driver Fleet</h1>
                <p className="text-muted-foreground">Manage and monitor all drivers on the platform.</p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Driver
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                     <DialogHeader>
                        <DialogTitle>Add New Driver</DialogTitle>
                     </DialogHeader>
                      <form onSubmit={handleAddDriver}>
                        <div className="grid lg:grid-cols-2 gap-6 py-4">
                            <Card className="border-0 shadow-none">
                                <CardHeader className="p-0 pb-4">
                                    <CardTitle>Personal Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-0">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name">First Name</Label>
                                            <Input id="first-name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name">Last Name</Label>
                                            <Input id="last-name" placeholder="Doe" required/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john.doe@example.com" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <PhoneNumberInput />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Set Initial Password</Label>
                                        <Input id="password" type="password" required />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-none">
                                <CardHeader className="p-0 pb-4">
                                    <CardTitle>Vehicle & Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-0">
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                                        <Select required>
                                            <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="scooter">Scooter</SelectItem>
                                                <SelectItem value="car">Car</SelectItem>
                                                <SelectItem value="van">Van</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle-model">Vehicle Model</Label>
                                            <Input id="vehicle-model" placeholder="e.g. Toyota Vitz" required/>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="license-plate">License Plate</Label>
                                            <Input id="license-plate" placeholder="AB12CD GP" required/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Initial Status</Label>
                                        <Select defaultValue="New" required>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="New">New (Pending Docs)</SelectItem>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Offline">Offline</SelectItem>
                                                <SelectItem value="Suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add Driver</Button>
                        </DialogFooter>
                    </form>
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
                    <DropdownMenuItem>Online</DropdownMenuItem>
                    <DropdownMenuItem>Offline</DropdownMenuItem>
                    <DropdownMenuItem>On a Job</DropdownMenuItem>
                    <DropdownMenuItem>New</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Accept. Rate</TableHead>
                <TableHead>Avg. Rating</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((d) => (
                <TableRow key={d.id} className="cursor-pointer" onClick={() => router.push(`/admin/drivers/${d.id}`)}>
                  <TableCell className="font-medium">
                     <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={d.avatar} alt={d.name} data-ai-hint="profile person" />
                        <AvatarFallback>{d.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {d.name}
                    </div>
                  </TableCell>
                  <TableCell>{d.location}</TableCell>
                   <TableCell>
                    <Badge variant="secondary" className={statusColors[d.status]}>{d.status}</Badge>
                   </TableCell>
                   <TableCell>{d.activeJobs}</TableCell>
                   <TableCell>{d.acceptanceRate}</TableCell>
                   <TableCell>{d.rating > 0 ? d.rating.toFixed(1) : 'N/A'}</TableCell>
                   <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => router.push(`/admin/drivers/${d.id}`)}>View Profile</DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => {e.stopPropagation(); handleGenericAction('Send Message', d.name)}}>Send Message</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => {e.stopPropagation(); handleGenericAction('Suspend', d.name)}}>Suspend</DropdownMenuItem>
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
