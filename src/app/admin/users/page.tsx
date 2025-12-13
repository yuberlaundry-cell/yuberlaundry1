
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
  Trash2,
  Edit,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole, getRedirectPathForRole, mockUsers } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const initialUsers = Object.values(mockUsers);

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Suspended: 'bg-gray-100 text-gray-800',
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
    const { login } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [users, setUsers] = useState(initialUsers.map(u => ({ ...u, status: 'Active' })));
    const [editingUser, setEditingUser] = useState<(typeof users)[0] | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleImpersonate = (role: UserRole) => {
        login(role);
        const redirectPath = getRedirectPathForRole(role);
        router.push(redirectPath);
    };
    
    const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = {
            id: editingUser ? editingUser.id : `user-${Date.now()}`,
            firstName: formData.get('first-name') as string,
            lastName: formData.get('last-name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as UserRole,
            avatarUrl: editingUser?.avatarUrl || `https://picsum.photos/seed/user${Date.now()}/100/100`,
            status: editingUser?.status || 'Active',
        };

        if (editingUser) {
            setUsers(prev => prev.map(u => u.id === editingUser.id ? userData : u));
            toast({ title: 'User Updated', description: `${userData.firstName} ${userData.lastName}'s details have been saved.` });
        } else {
            setUsers(prev => [userData, ...prev]);
            toast({ title: 'User Added', description: `${userData.firstName} has been invited to the platform.` });
        }
        setIsFormOpen(false);
        setEditingUser(null);
    }
    
    const handleOpenDialog = (user: (typeof users)[0] | null) => {
        setEditingUser(user);
        setIsFormOpen(true);
    }
    
    const handleDelete = (userId: string) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
        toast({ title: 'User Deleted', variant: 'destructive' });
    }
    
    const handleSuspend = (userId: string) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
        toast({ title: 'User Status Updated' });
    }


  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Users</h1>
                <p className="text-muted-foreground">Manage all users across the platform.</p>
            </div>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto" onClick={() => handleOpenDialog(null)}>
                        <PlusCircle /> Add User
                    </Button>
                </DialogTrigger>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                        <DialogDescription>{editingUser ? `Update the details for ${editingUser.firstName}.` : 'Invite a new user to the platform.'}</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSaveUser}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" name="first-name" defaultValue={editingUser?.firstName} required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" name="last-name" defaultValue={editingUser?.lastName} required/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={editingUser?.email} required/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                             <Select name="role" defaultValue={editingUser?.role} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(mockUsers).map(role => (
                                        <SelectItem key={role} value={role}>{toTitleCase(role)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {!editingUser && (
                            <div className="space-y-2">
                                <Label htmlFor="password">Set Initial Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="submit">{editingUser ? 'Save Changes' : 'Add User'}</Button>
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
                placeholder="Search by name, email, or role..."
                className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[350px]"
            />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                    Role: All <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    {Object.keys(mockUsers).map(role => (
                         <DropdownMenuItem key={role}>{toTitleCase(role)}</DropdownMenuItem>
                    ))}
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
                    <DropdownMenuItem>Suspended</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="cursor-pointer" onClick={() => router.push(`/admin/users/${user.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={user.firstName}
                          data-ai-hint="profile person"
                        />
                        <AvatarFallback>
                          {user.firstName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={roleColors[user.role]}>
                      {toTitleCase(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <AlertDialog>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => router.push(`/admin/users/${user.id}`)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleOpenDialog(user)}><Edit className="mr-2 h-4 w-4"/>Edit User</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleImpersonate(user.role)}>Impersonate User</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleSuspend(user.id)}>{user.status === 'Active' ? 'Suspend' : 'Unsuspend'}</DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete User</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                        </DropdownMenu>
                         <AlertDialogContent>
                             <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user account for {user.firstName}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>Delete User</AlertDialogAction>
                            </AlertDialogFooter>
                         </AlertDialogContent>
                    </AlertDialog>
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
