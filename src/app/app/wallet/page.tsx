
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreditCard, Gift, PlusCircle, ShieldQuestion, Loader2, Star, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const transactions = [
    { date: 'May 12, 2024', description: 'Order #YL12344', amount: '-R255.50', points: '+2550 pts'},
    { date: 'May 10, 2024', description: 'Redeemed: R50 Voucher', amount: '', points: '-1000 pts'},
    { date: 'May 10, 2024', description: 'Funds added via Paystack', amount: '+R500.00', points: ''},
    { date: 'May 8, 2024', description: 'Referral bonus from J. Smith', amount: '+R100.00', points: '+1000 pts'},
];

const rewards = [
    { name: 'R50 Off Your Next Order', cost: 5000 },
    { name: 'Free Delivery', cost: 2500 },
    { name: 'Free Ironing (5 items)', cost: 7500 },
    { name: 'Plant a Tree', cost: 1000 },
]

export default function WalletPage() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [topUpAmount, setTopUpAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);
  const [isProcessingGift, setIsProcessingGift] = useState(false);
  const [giftAmount, setGiftAmount] = useState('');
  const [points, setPoints] = useState(1245);
  const nextRewardTier = 5000;

  const handleAddFunds = () => {
    const amountInKobo = (customAmount ? parseFloat(customAmount) : topUpAmount) * 100;
    if (isNaN(amountInKobo) || amountInKobo <= 0) {
        toast({ title: 'Invalid Amount', description: 'Please enter a valid amount to add.', variant: 'destructive'});
        return;
    }

    setIsProcessingTopUp(true);
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        email: user?.email || '',
        amount: amountInKobo,
        currency: 'ZAR',
        reference: `yuber_topup_${Date.now()}`,
        onSuccess: (transaction) => {
            toast({ title: 'Payment Successful!', description: `R${(amountInKobo / 100).toFixed(2)} has been added to your wallet.` });
            setIsProcessingTopUp(false);
        },
        onClose: () => {
            setIsProcessingTopUp(false);
        },
    });
  };

  const handleSendGift = (e: React.FormEvent) => {
      e.preventDefault();
      const amount = parseFloat(giftAmount);
      if (isNaN(amount) || amount <= 0) {
          toast({ title: 'Invalid Gift Amount', description: 'Please enter a valid amount for the gift card.', variant: 'destructive'});
          return;
      }
      setIsProcessingGift(true);
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        email: user?.email || '',
        amount: amount * 100,
        currency: 'ZAR',
        reference: `yuber_gift_${Date.now()}`,
        onSuccess: (transaction) => {
            toast({ title: 'Gift Card Sent!', description: `Your gift of R${amount.toFixed(2)} has been sent.` });
            setIsProcessingGift(false);
            setGiftAmount('');
        },
        onClose: () => {
            setIsProcessingGift(false);
        },
      });
  }

  const handleRedeem = (cost: number, rewardName: string) => {
      if (points >= cost) {
          setPoints(currentPoints => currentPoints - cost);
          toast({
              title: "Reward Redeemed!",
              description: `You've successfully redeemed "${rewardName}".`,
          });
      }
  }


  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Yuber Wallet</h1>
        <p className="text-muted-foreground">
          Manage your balance, credits, and transaction history.
        </p>
      </div>
      
       <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500 fill-yellow-500"/> Loyalty Points</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6 items-center">
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">Your Points Balance</p>
                            <p className="text-4xl font-bold">{points.toLocaleString()}</p>
                        </div>
                        <div>
                             <div className="mb-1 flex justify-between items-baseline">
                                <p className="text-sm font-medium">Next Reward</p>
                                <p className="text-sm font-bold text-muted-foreground">
                                    {(nextRewardTier - points).toLocaleString()} pts to go
                                </p>
                            </div>
                            <Progress value={(points / nextRewardTier) * 100} />
                            <p className="text-xs text-muted-foreground mt-1">You're on your way to a R50 voucher!</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">Redeem Points</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Redeem Your Points</DialogTitle>
                                <DialogDescription>You have {points.toLocaleString()} points. Choose a reward to claim.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-4">
                                {rewards.map(reward => (
                                    <Card key={reward.name} className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{reward.name}</p>
                                                <p className="text-sm text-muted-foreground">{reward.cost.toLocaleString()} points</p>
                                            </div>
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRedeem(reward.cost, reward.name)}
                                                disabled={points < reward.cost}
                                            >
                                                Redeem
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Cash Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-1 text-center border p-4 rounded-lg bg-muted/50">
                            <p className="text-sm text-muted-foreground">Available Balance</p>
                            <p className="text-2xl font-bold">R150.50</p>
                        </div>
                         <div className="space-y-1 text-center border p-4 rounded-lg bg-muted/50 mt-4">
                            <p className="text-sm text-muted-foreground">Referral Credits</p>
                            <p className="text-2xl font-bold">R500.00</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 ? transactions.map(t => (
                         <TableRow key={t.date + t.description}>
                            <TableCell>{t.date}</TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell className={`text-right font-medium ${t.amount.startsWith('+') ? 'text-green-600' : ''}`}>{t.amount}</TableCell>
                            <TableCell className={`text-right font-medium ${t.points.startsWith('+') ? 'text-green-600' : 'text-destructive'}`}>{t.points}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                                No transactions yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
        <div className="space-y-8 lg:sticky top-24">
            <Card>
                <CardHeader>
                <CardTitle>Add Funds</CardTitle>
                <CardDescription>Top up your wallet via Paystack.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        {[100, 250, 500].map(amount => (
                            <Button 
                                key={amount}
                                variant={topUpAmount === amount && !customAmount ? 'default' : 'outline'}
                                className="flex-1"
                                onClick={() => { setTopUpAmount(amount); setCustomAmount(''); }}
                            >
                                R{amount}
                            </Button>
                        ))}
                    </div>
                    <Input 
                        id="custom-amount" 
                        placeholder="Or enter custom amount" 
                        className="flex-1" 
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setTopUpAmount(0); }}
                    />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleAddFunds} disabled={isProcessingTopUp}>
                        {isProcessingTopUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldQuestion className="mr-2 h-4 w-4" />}
                        {isProcessingTopUp ? 'Processing...' : 'Add Funds'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
