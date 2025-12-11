
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
import { CreditCard, Gift, PlusCircle, ShieldQuestion } from 'lucide-react';
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

const kpiCards = [
    { title: "Available Balance", value: "£15.50" },
    { title: "Referral Credits", value: "£50.00" },
    { title: "Loyalty Points", value: "1,245", description: "Equal to £12.45" },
];

const transactions = [
    { date: 'May 12, 2024', description: 'Order #YL12344', amount: '-£25.50'},
    { date: 'May 10, 2024', description: 'Funds added via Paystack', amount: '+£50.00'},
    { date: 'May 8, 2024', description: 'Referral bonus from J. Smith', amount: '+£10.00'},
];

export default function WalletPage() {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText('JANE-DOE-123');
    toast({
      title: 'Copied to clipboard!',
      description: 'Your referral code has been copied.',
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
                        <Button variant="outline" className="flex-1 text-lg">£25</Button>
                        <Button className="flex-1 text-lg">£50</Button>
                        <Button variant="outline" className="flex-1 text-lg">£100</Button>
                        <Input id="custom-amount" placeholder="Custom Amount" className="flex-1 h-12 text-lg" />
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
                 <Button className="w-full">
                    <ShieldQuestion className="mr-2 h-4 w-4" /> Add Funds with Paystack
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
                <p className="text-sm text-muted-foreground">You have <span className="font-bold text-foreground">1,245 points</span> available. Conversion rate is 100 points = £1.00.</p>
                <Button className="w-full mt-4">Redeem Points</Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Send a Gift Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="gift-amount">Amount</Label>
                    <Input id="gift-amount" type="number" placeholder="£50.00" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="recipient-email">Recipient's email or phone</Label>
                    <Input id="recipient-email" placeholder="email@example.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="gift-message">Optional message</Label>
                    <Textarea id="gift-message" placeholder="Enjoy some clean clothes!" />
                </div>
                <Button className="w-full">Send Gift</Button>
            </CardContent>
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
