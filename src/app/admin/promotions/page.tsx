
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
  Tag,
  Gift,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const promotions = [
    { code: 'WELCOME20', value: '20% off', type: 'First Order', uses: 125, limit: 1000, status: 'Active' },
    { code: 'YUBERPLUS10', value: '10% off', type: 'Subscription', uses: 450, limit: 0, status: 'Active' },
    { code: 'SAVEBIG50', value: 'R50 off', type: 'General', uses: 50, limit: 50, status: 'Expired' },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Expired: 'bg-gray-100 text-gray-800',
};

export default function PromotionsPage() {
    const { toast } = useToast();

    const handleCreatePromo = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Promotion Created",
            description: "The new promotional code is now active.",
        });
    }

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Promotions</h1>
                <p className="text-muted-foreground">Create and manage discount codes for marketing campaigns.</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Promotion
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Promotion</DialogTitle>
                        <DialogDescription>Define a new discount code and its rules.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleCreatePromo}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="promo-code">Promo Code</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="promo-code" placeholder="e.g., LAUNCH25" />
                                    <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4"/></Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="promo-type">Type</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount (R)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="promo-value">Value</Label>
                            <Input id="promo-value" type="number" placeholder="e.g., 25 or 100" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="promo-limit">Usage Limit</Label>
                            <Input id="promo-limit" type="number" placeholder="Leave blank for unlimited" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="promo-expiry">Expiry Date (optional)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">Select a date</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar /></PopoverContent>
                            </Popover>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create & Activate</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

      <Card>
         <CardHeader>
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by code..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[350px]"
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((p) => (
                <TableRow key={p.code}>
                  <TableCell className="font-mono text-primary font-semibold">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {p.code}
                    </div>
                  </TableCell>
                  <TableCell>{p.value}</TableCell>
                   <TableCell>{p.type}</TableCell>
                   <TableCell>{p.uses} / {p.limit || '∞'}</TableCell>
                   <TableCell>
                        <Badge variant="secondary" className={statusColors[p.status as keyof typeof statusColors]}>{p.status}</Badge>
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
                                <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
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
