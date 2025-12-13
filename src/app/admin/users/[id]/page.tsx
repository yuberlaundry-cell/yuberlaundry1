
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
    ArrowLeft,
    Edit,
    Mail,
    ShieldOff,
    Check,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/lib/auth';

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

const recentActivity = [
    { event: 'Logged In', date: 'Today, 2:30 PM' },
    { event: 'Placed Order #YL12345', date: 'Yesterday, 10:05 AM' },
];

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;
    
    // Find user by ID. Fallback to a default if not found.
    const user = Object.values(mockUsers).find(u => u.id === userId) || mockUsers['consumer'];

    return (
        <div className="space-y-6">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Button variant="ghost" asChild className="-ml-4">
                        <Link href="/admin/users">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                        </Link>
                    </Button>
                    <div className="flex items-center gap-4 mt-2">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold font-headline">{user.firstName} {user.lastName}</h1>
                                <Badge variant="secondary" className={statusColors['Active']}>Active</Badge>
                                <Badge variant="secondary" className={roleColors[user.role]}>{toTitleCase(user.role)}</Badge>
                            </div>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Mail className="mr-2"/> Send Password Reset</Button>
                    <Button variant="outline"><Edit className="mr-2"/> Edit User</Button>
                    <Button variant="destructive"><ShieldOff className="mr-2"/> Suspend</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <CardDescription>This user has permissions associated with the <strong>{toTitleCase(user.role)}</strong> role.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                       <p className="flex items-center gap-2"><Check className="h-4 w-4 text-primary"/> Access {toTitleCase(user.role)} Portal</p>
                       <Button variant="link" className="p-0 h-auto" asChild><Link href="/admin/roles">Manage Roles & Permissions</Link></Button>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivity.map(activity => (
                                    <TableRow key={activity.event}>
                                        <TableCell className="font-medium">{activity.event}</TableCell>
                                        <TableCell className="text-right">{activity.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
