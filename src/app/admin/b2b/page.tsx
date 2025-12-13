
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
  Building,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const initialCompanies = [
    { id: 'acme-corp', name: 'Acme Corp', industry: 'Technology', admin: 'John Smith', plan: 'Business Pro', status: 'Active' },
    { id: 'stark-industries', name: 'Stark Industries', industry: 'Defense', admin: 'Tony Stark', plan: 'Enterprise', status: 'Active' },
    { id: 'wayne-enterprises', name: 'Wayne Enterprises', industry: 'Conglomerate', admin: 'Bruce Wayne', plan: 'Business Pro', status: 'Active' },
    { id: 'cyberdyne-systems', name: 'Cyberdyne Systems', industry: 'Technology', admin: 'Miles Dyson', plan: 'Onboarding', status: 'Pending' },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-800',
  Suspended: 'bg-red-100 text-red-800',
};


export default function B2BAccountsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [companies, setCompanies] = useState(initialCompanies);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleAddCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newCompany = {
            id: (formData.get('company-name') as string).toLowerCase().replace(/\s+/g, '-'),
            name: formData.get('company-name') as string,
            industry: 'New',
            admin: formData.get('admin-name') as string,
            plan: formData.get('company-plan') === 'pro' ? 'Business Pro' : 'Enterprise',
            status: 'Pending',
        };
        setCompanies(prev => [newCompany, ...prev]);
        toast({
            title: "Company Onboarded!",
            description: "The new corporate account has been created and an invite has been sent to the admin.",
        });
        setIsDialogOpen(false);
    }

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">B2B Accounts</h1>
                <p className="text-muted-foreground">Onboard and manage corporate client accounts.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Onboard New Company</DialogTitle>
                        <DialogDescription>
                            Create a new corporate account and invite the primary admin.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleAddCompany}>
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" name="company-name" placeholder="e.g., Acme Corporation" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="admin-name">Admin Full Name</Label>
                                <Input id="admin-name" name="admin-name" placeholder="John Smith" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admin-email">Admin Email</Label>
                                <Input id="admin-email" name="admin-email" type="email" placeholder="john@acme.com" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company-plan">Subscription Plan</Label>
                            <Select name="company-plan" required>
                                <SelectTrigger id="company-plan">
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pro">Business Pro (100 employees)</SelectItem>
                                    <SelectItem value="enterprise">Enterprise (Unlimited)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Send Invite & Create Account</Button>
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
                    placeholder="Search by company or admin..."
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
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Suspended</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Primary Admin</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id} onClick={() => router.push(`/admin/b2b/${c.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md">
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {c.name}
                    </div>
                  </TableCell>
                  <TableCell>{c.industry}</TableCell>
                   <TableCell>{c.admin}</TableCell>
                   <TableCell>{c.plan}</TableCell>
                   <TableCell>
                        <Badge variant="secondary" className={statusColors[c.status]}>{c.status}</Badge>
                   </TableCell>
                   <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => router.push(`/admin/b2b/${c.id}`)}>View Company Details</DropdownMenuItem>
                                <DropdownMenuItem>Manage Employees</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Suspend Company</DropdownMenuItem>
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
