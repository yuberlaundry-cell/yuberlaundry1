
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
  Star,
  MinusCircle,
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
import { mockUsers } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const usersWithPoints = Object.values(mockUsers).map(u => ({ ...u, points: Math.floor(Math.random() * 2000) }));

const pointTransactions = [
    { user: 'Jane Doe', date: '2024-05-12', type: 'Earn', amount: 255, reason: 'Order #YL12344'},
    { user: 'Jane Doe', date: '2024-05-10', type: 'Redeem', amount: -1000, reason: 'R50 Voucher'},
    { user: 'John Smith', date: '2024-05-09', type: 'Adjust', amount: 500, reason: 'Customer service grant'},
];

const initialRewards = [
    { id: 'reward-1', name: 'R50 Off Next Order', cost: 1000 },
    { id: 'reward-2', name: 'Free Delivery', cost: 500 },
    { id: 'reward-3', name: 'Free Ironing (5 items)', cost: 1500 },
]

export default function LoyaltyProgramPage() {
    const { toast } = useToast();
    const [rewards, setRewards] = useState(initialRewards);
    const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<typeof initialRewards[0] | null>(null);

    const handlePointAdjustment = (e: React.FormEvent, userName: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const points = formData.get('points');
        const reason = formData.get('reason');
        toast({
            title: "Points Adjusted",
            description: `${points} points have been adjusted for ${userName}. Reason: ${reason}`
        });
    }

    const handleSaveReward = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get('reward-name') as string;
        const cost = Number(formData.get('reward-cost'));
        
        if (editingReward) {
            setRewards(prev => prev.map(r => r.id === editingReward.id ? { ...r, name, cost } : r));
            toast({ title: "Reward Updated", description: "The redemption reward has been updated." });
        } else {
            const newReward = { id: `reward-${Date.now()}`, name, cost };
            setRewards(prev => [newReward, ...prev]);
            toast({ title: "Reward Added", description: "The new reward is now available for customers." });
        }
        setIsRewardDialogOpen(false);
        setEditingReward(null);
    }
    
    const handleEditReward = (reward: typeof initialRewards[0]) => {
        setEditingReward(reward);
        setIsRewardDialogOpen(true);
    }

    const handleDeleteReward = (rewardId: string) => {
        setRewards(prev => prev.filter(r => r.id !== rewardId));
        toast({ title: "Reward Deleted", variant: "destructive" });
    }

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Loyalty Program</h1>
                <p className="text-muted-foreground">Manage customer points and program settings.</p>
            </div>
        </div>

        <Tabs defaultValue="customers">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customers">Customer Points</TabsTrigger>
                <TabsTrigger value="settings">Program Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="customers">
                <Card>
                    <CardHeader>
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by customer name or email..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[350px]"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Points Balance</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {usersWithPoints.map((user) => (
                            <TableRow key={user.id}>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell className="font-semibold">{user.points.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View History</DropdownMenuItem>
                                         <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={e => e.preventDefault()}>Adjust Points</DropdownMenuItem>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                     <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Adjust Points for {user.firstName}</DialogTitle>
                                            <DialogDescription>
                                                Manually add or remove loyalty points. This will be logged.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form className="space-y-4" onSubmit={(e) => handlePointAdjustment(e, user.firstName)}>
                                            <div className="space-y-2">
                                                <Label htmlFor="points">Points to Add/Remove</Label>
                                                <Input id="points" name="points" type="number" placeholder="e.g., 500 or -200" required/>
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="reason">Reason for Adjustment</Label>
                                                <Textarea id="reason" name="reason" placeholder="e.g., Goodwill gesture for delayed order." required/>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Apply Adjustment</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="settings">
                 <Card>
                    <CardHeader>
                        <CardTitle>Program Rules</CardTitle>
                        <CardDescription>Configure how customers earn and redeem points.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="earn-ratio">Earn Ratio (Points per R)</Label>
                            <Input id="earn-ratio" type="number" defaultValue="10" />
                            <p className="text-xs text-muted-foreground">e.g., A value of 10 means 10 points are earned for every R1 spent.</p>
                        </div>
                         <Separator />
                        <div>
                            <Label>Redemption Rewards</Label>
                             <div className="space-y-2 mt-2">
                                {rewards.map(reward => (
                                    <div key={reward.id} className="flex items-center gap-2 p-3 border rounded-lg">
                                        <div className="flex-grow">
                                            <p className="font-medium">{reward.name}</p>
                                            <p className="text-sm text-muted-foreground">{reward.cost} points</p>
                                        </div>
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditReward(reward)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Delete Reward?</AlertDialogTitle></AlertDialogHeader>
                                                <AlertDialogDescription>
                                                    This will permanently delete the "{reward.name}" reward. This action cannot be undone.
                                                </AlertDialogDescription>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteReward(reward.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                ))}
                                 <Button variant="outline" className="w-full" onClick={() => { setEditingReward(null); setIsRewardDialogOpen(true); }}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Reward
                                </Button>
                             </div>
                        </div>
                         <Button>Save Program Settings</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        <Dialog open={isRewardDialogOpen} onOpenChange={setIsRewardDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingReward ? 'Edit Reward' : 'Add New Reward'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveReward} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reward-name">Reward Name</Label>
                        <Input id="reward-name" name="reward-name" defaultValue={editingReward?.name} placeholder="e.g., R100 Off Voucher" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reward-cost">Point Cost</Label>
                        <Input id="reward-cost" name="reward-cost" type="number" defaultValue={editingReward?.cost} placeholder="e.g., 2000" required />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Reward</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}
