
'use client';

import {
  Card,
  CardContent,
  CardHeader,
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
import { UserRole } from '@/lib/auth';

const users = [
    { id: 'user-consumer-1', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'consumer', status: 'Active', registered: '2024-05-10', avatar: 'https://picsum.photos/seed/user1/40/40' },
    { id: 'user-bizadmin-1', name: 'John Smith', email: 'john.smith@acmecorp.com', role: 'business_admin', status: 'Active', registered: '2024-03-20', avatar: 'https://picsum.photos/seed/user2/40/40' },
    { id: 'user-driver-1', name: 'Alex Ray', email: 'alex.ray@yuber.com', role: 'driver', status: 'Active', registered: '2024-04-15', avatar: 'https://picsum.photos/seed/user3/40/40' },
    { id: 'user-superadmin-1', name: 'Sam Admin', email: 'sam.admin@yuberlaundry.com', role: 'superadmin', status: 'Active', registered: '2024-01-01', avatar: 'https://picsum.photos/seed/user4/40/40' },
    { id: 'user-laundromat-1', name: 'Maria Garcia', email: 'maria.g@mainstreetlaundry.com', role: 'laundromat_staff', status: 'Active', registered: '2024-02-18', avatar: 'https://picsum.photos/seed/user5/40/40' },
     { id: 'user-bizemployee-1', name: 'Emily Jones', email: 'emily.jones@acmecorp.com', role: 'business_employee', status: 'Inactive', registered: '2024-05-01', avatar: 'https://picsum.photos/seed/user6/40/40' },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
};

const roleColors: { [key: string]: string } = {
  consumer: 'bg-blue-100 text-blue-800',
  business_admin: 'bg-purple-100 text-purple-800',
  business_employee: 'bg-purple-100 text-purple-800',
  driver: 'bg-orange-100 text-orange-800',
  laundromat_staff: 'bg-teal-100 text-teal-800',
  superadmin: 'bg-red-100 text-red-800',
};

const toTitleCase = (str: string) => {
    return str.replace(/_/g, ' ').replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

export default function UsersPage() {
  return (
    <div className="space-y-8 pb-8">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Users</h1>
                <p className="text-muted-foreground">Manage all users across the platform.</p>
            </div>
            <div className="flex gap-2">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Invite User
                </Button>
            </div>
        </div>

      <Card>
         <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name, email, or role..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                            Role: All <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>All</DropdownMenuItem>
                            <DropdownMenuItem>Consumer</DropdownMenuItem>
                            <DropdownMenuItem>Business Admin</DropdownMenuItem>
                            <DropdownMenuItem>Business Employee</DropdownMenuItem>
                            <DropdownMenuItem>Driver</DropdownMenuItem>
                            <DropdownMenuItem>Laundromat Staff</DropdownMenuItem>
                             <DropdownMenuItem>Superadmin</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile person" />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </TableCell>
                   <TableCell>
                        <Badge variant="secondary" className={roleColors[user.role]}>
                            {toTitleCase(user.role)}
                        </Badge>
                   </TableCell>
                   <TableCell>
                        <Badge variant="secondary" className={statusColors[user.status]}>{user.status}</Badge>
                   </TableCell>
                   <TableCell>{user.registered}</TableCell>
                   <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                <DropdownMenuItem>Impersonate User</DropdownMenuItem>
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
