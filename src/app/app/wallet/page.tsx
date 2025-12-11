
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
import PaystackPop from '@paystack/inline-js';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { LoyaltyCard } from '@/components/app/loyalty-card';

const transactions = [
    { date: 'May 12, 2024', description: 'Order #YL12344', amount: '-R255.50', points: '+2550 pts'},
    { date: 'May 10, 2024', description: 'Redeemed: R50 Voucher', amount: '', points: '-1000 pts'},
    { date: 'May 10, 2024', description: 'Funds added via Paystack', amount: '+R500.00', points: ''},
    { date: 'May 8, 2024', description: 'Referral bonus from J. Smith', amount: '+R100.00', points: '+1000 pts'},
];

export default function WalletPage() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [topUpAmount, setTopUpAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

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

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Yuber Wallet</h1>
        <p className="text-muted-foreground">
          Manage your balance, credits, and transaction history.
        </p>
      </div>
      
       <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <LoyaltyCard />
            </div>

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
