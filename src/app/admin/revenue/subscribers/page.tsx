
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
  Search,
  ChevronDown,
  Download,
  PowerOff,
  Power,
  Users,
  Building,
  Crown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const subscribers = [
    { customer: 'Jane Doe', avatar: 'https://picsum.photos/seed/user1/40/40', plan: 'Yuber Repeat (2 Bags)', planType: 'Consumer', status: 'Active', renewalDate: 'June 1, 2024' },
    { customer: 'Acme Corp', avatar: 'https://picsum.photos/seed/biz1/40/40', plan: 'Business Pro', planType: 'Business', status: 'Active', renewalDate: 'June 15, 2024' },
    { customer: 'John Smith', avatar: 'https://picsum.photos/seed/user2/40/40', plan: 'Yuber Repeat (1 Bag)', planType: 'Consumer', status: 'Active', renewalDate: 'June 5, 2024' },
    { customer: 'Speedy Suds', avatar: 'https://picsum.photos/seed/lnd1/40/40', plan: 'Partner Tier 1', planType: 'Laundromat', status: 'Active', renewalDate: 'June 20, 2024' },
    { customer: 'Mike Ross', avatar: 'https://picsum.photos/seed/user3/40/40', plan: 'Yuber Lite (Legacy)', planType: 'Consumer', status: 'Cancelled', renewalDate: 'N/A' },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Cancelled: 'bg-gray-100 text-gray-800',
  Paused: 'bg-amber-100 text-amber-800',
};

const planTypeColors: { [key: string]: string } = {
  Consumer: 'bg-blue-100 text-blue-800',
  Business: 'bg-purple-100 text-purple-800',
  Laundromat: 'bg-teal-100 text-teal-800',
};

const planTypeIcons: { [key: string]: React.FC } = {
  Consumer: Users,
  Business: Building,
  Laundromat: Crown,
}


export default function SubscribersPage() {
    const { toast } = useToast();

    const handleAction = (action: string, customer: string) => {
        toast({
            title: `Action: ${action}`,
            description: `The subscription for ${customer} has been updated.`,
        });
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Subscribers</h1>
          <p className="text-muted-foreground">Manage all active and inactive subscriptions on the platform.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by customer or plan..."
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
                        <DropdownMenuItem>Cancelled</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                        Plan Type: All <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>All</DropdownMenuItem>
                        <DropdownMenuItem>Consumer</DropdownMenuItem>
                        <DropdownMenuItem>Business</DropdownMenuItem>
                        <DropdownMenuItem>Laundromat</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Renewal</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.customer}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={s.avatar} alt={s.customer} data-ai-hint="profile person" />
                        <AvatarFallback>{s.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                       <span className="font-medium">{s.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.plan}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={planTypeColors[s.planType as keyof typeof planTypeColors]}>{s.planType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[s.status as keyof typeof statusColors]}>{s.status}</Badge>
                   </TableCell>
                   <TableCell>{s.renewalDate}</TableCell>
                   <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Customer Details</DropdownMenuItem>
                                {s.status === 'Active' ? (
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Cancel Subscription', s.customer)}>
                                        <PowerOff className="mr-2"/> Cancel Subscription
                                    </DropdownMenuItem>
                                ) : (
                                     <DropdownMenuItem onClick={() => handleAction('Re-enable Subscription', s.customer)}>
                                        <Power className="mr-2"/> Re-enable Subscription
                                    </DropdownMenuItem>
                                )}
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
