
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
import { CreditCard, Gift, PlusCircle, ShieldQuestion, Loader2 } from 'lucide-react';
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

const kpiCards = [
    { title: "Available Balance", value: "R150.50" },
    { title: "Referral Credits", value: "R500.00" },
    { title: "Loyalty Points", value: "1,245", description: "Equal to R124.50" },
];

const transactions = [
    { date: 'May 12, 2024', description: 'Order #YL12344', amount: '-R255.50'},
    { date: 'May 10, 2024', description: 'Funds added via Paystack', amount: '+R500.00'},
    { date: 'May 8, 2024', description: 'Referral bonus from J. Smith', amount: '+R100.00'},
];

export default function WalletPage() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [topUpAmount, setTopUpAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);
  const [isProcessingGift, setIsProcessingGift] = useState(false);
  const [giftAmount, setGiftAmount] = useState('');

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


  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Yuber Wallet</h1>
        <p className="text-muted-foreground">
          Manage your balance, credits, and transaction history.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kpiCards.map((card) => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
                    </CardContent>
                </Card>
            ))}
        </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
               <CardDescription>Select an amount and payment method. Payments are processed securely by Paystack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        {[250, 500, 1000].map(amount => (
                            <Button 
                                key={amount}
                                variant={topUpAmount === amount && !customAmount ? 'default' : 'outline'}
                                className="flex-1 text-lg"
                                onClick={() => { setTopUpAmount(amount); setCustomAmount(''); }}
                            >
                                R{amount}
                            </Button>
                        ))}
                        <Input 
                            id="custom-amount" 
                            placeholder="Custom Amount" 
                            className="flex-1 h-12 text-lg" 
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); setTopUpAmount(0); }}
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select defaultValue="visa-4242">
                        <SelectTrigger id="payment-method">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="visa-4242">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" /> Visa ending in 4242
                                </div>
                            </SelectItem>
                             <SelectItem value="mastercard-5555">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" /> Mastercard ending in 5555
                                </div>
                            </SelectItem>
                             <SelectItem value="new-card">
                                 <div className="flex items-center gap-2">
                                    <PlusCircle className="h-4 w-4" /> Add a new card
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full" onClick={handleAddFunds} disabled={isProcessingTopUp}>
                    {isProcessingTopUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldQuestion className="mr-2 h-4 w-4" />}
                    {isProcessingTopUp ? 'Processing...' : 'Add Funds with Paystack'}
                </Button>
            </CardFooter>
          </Card>
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
                </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 ? transactions.map(t => (
                         <TableRow key={t.date + t.description}>
                            <TableCell>{t.date}</TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell className={`text-right font-medium ${t.amount.startsWith('+') ? 'text-green-600' : ''}`}>{t.amount}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                                No transactions yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle>Loyalty Points</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">You have <span className="font-bold text-foreground">1,245 points</span> available. Conversion rate is 10 points = R1.00.</p>
                <Button className="w-full mt-4">Redeem Points</Button>
            </CardContent>
          </Card>
           <Card>
            <form onSubmit={handleSendGift}>
                <CardHeader>
                    <CardTitle>Send a Gift Card</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="gift-amount">Amount</Label>
                        <Input id="gift-amount" type="number" placeholder="R500.00" value={giftAmount} onChange={(e) => setGiftAmount(e.target.value)} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="recipient-email">Recipient's email or phone</Label>
                        <Input id="recipient-email" placeholder="email@example.com" required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="gift-message">Optional message</Label>
                        <Textarea id="gift-message" placeholder="Enjoy some clean clothes!" />
                    </div>
                    <Button type="submit" className="w-full" disabled={isProcessingGift}>
                        {isProcessingGift ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gift className="mr-2 h-4 w-4" />}
                        {isProcessingGift ? 'Sending...' : 'Send Gift'}
                    </Button>
                </CardContent>
            </form>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle>Enable Auto Top-up</CardTitle>
                <CardDescription>Never run out of balance. Automatically add funds when your balance is low.</CardDescription>
            </CardHeader>
             <CardContent>
                <Button variant="outline" className="w-full">Set Up Auto Top-up</Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
