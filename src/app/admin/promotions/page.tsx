
'use client';
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
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Tag,
  Trash2,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PromoCodeForm, type Promotion } from '@/components/admin/promotions/promo-code-form';

const initialPromotions: Promotion[] = [
    { id: 'promo-1', code: 'WELCOME20', value: '20', type: 'percentage', uses: 125, limit: 1000, status: 'Active', expiryDate: new Date('2025-12-31') },
    { id: 'promo-2', code: 'YUBERPLUS10', value: '10', type: 'percentage', uses: 450, limit: null, status: 'Active' },
    { id: 'promo-3', code: 'SAVEBIG50', value: '50', type: 'fixed', uses: 50, limit: 50, status: 'Expired', expiryDate: new Date('2024-01-01') },
];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-800',
  Expired: 'bg-gray-100 text-gray-800',
};

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState(initialPromotions);
    const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
    const { toast } = useToast();

    const handleSavePromo = (promoData: Omit<Promotion, 'id' | 'uses' | 'status'> & { id?: string }) => {
        if (editingPromo) {
            setPromotions(prev => prev.map(p => p.id === editingPromo.id ? { ...p, ...promoData } : p));
            toast({ title: "Promotion Updated" });
        } else {
            const newPromo: Promotion = {
                id: `promo-${Date.now()}`,
                code: promoData.code,
                value: promoData.value,
                type: promoData.type,
                uses: 0,
                limit: promoData.limit,
                status: 'Active',
                expiryDate: promoData.expiryDate
            };
            setPromotions(prev => [newPromo, ...prev]);
            toast({ title: "Promotion Created" });
        }
        setIsPromoDialogOpen(false);
        setEditingPromo(null);
    };

    const handleEditPromo = (promo: Promotion) => {
        setEditingPromo(promo);
        setIsPromoDialogOpen(true);
    }
    
    const handleDeletePromo = (promoId: string) => {
        setPromotions(prev => prev.filter(p => p.id !== promoId));
        toast({ title: "Promotion Deleted", variant: "destructive" });
    }

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Promotions</h1>
                <p className="text-muted-foreground">Create and manage discount codes for marketing campaigns.</p>
            </div>
            <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => { setEditingPromo(null); setIsPromoDialogOpen(true); }}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Promotion
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingPromo ? "Edit Promotion" : "Create New Promotion"}</DialogTitle>
                        <DialogDescription>Define a discount code and its rules.</DialogDescription>
                    </DialogHeader>
                    <PromoCodeForm promo={editingPromo} onSave={handleSavePromo} />
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
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-primary font-semibold">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {p.code}
                    </div>
                  </TableCell>
                  <TableCell>{p.type === 'fixed' ? `R${p.value}` : `${p.value}%`}</TableCell>
                   <TableCell className="capitalize">{p.type}</TableCell>
                   <TableCell>{p.uses} / {p.limit || '∞'}</TableCell>
                   <TableCell>
                        <Badge variant="secondary" className={statusColors[p.status as keyof typeof statusColors]}>{p.status}</Badge>
                   </TableCell>
                   <TableCell className="text-right">
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditPromo(p)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                     <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Promotion?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the <strong>{p.code}</strong> promotion.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeletePromo(p.id)}>Yes, Delete</AlertDialogAction>
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
