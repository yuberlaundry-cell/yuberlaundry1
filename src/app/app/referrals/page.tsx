
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Copy,
  Mail,
  Users,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const kpiCards = [
  { title: 'Friends Invited', value: '12' },
  { title: 'Friends Booked', value: '5' },
  { title: 'Your Earnings', value: 'R500.00' },
  { title: 'Pending Earnings', value: 'R200.00' },
];

const referralHistory = [
    { name: 'John Smith', date: 'May 10, 2024', status: 'Booked', reward: 'R100.00' },
    { name: 'Alice Johnson', date: 'May 8, 2024', status: 'Invited', reward: '-' },
    { name: 'Michael Davis', date: 'May 5, 2024', status: 'Booked', reward: 'R100.00' },
];

const referralCode = 'YUBER-SUPER02SB';

export default function ReferralsPage() {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: 'Copied to clipboard!',
      description: 'Your referral code has been copied.',
    });
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Customer Referrals
        </h1>
        <p className="text-muted-foreground">
          Invite friends, earn rewards. It's that simple.
        </p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Your Unique Referral Code</p>
            <div className="flex items-center justify-center gap-2 my-4">
                <div className="px-4 py-2 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 font-mono text-xl">
                    {referralCode}
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-5 w-5" />
                </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Share with your friends via</p>
            <div className="flex justify-center gap-2">
                <Button variant="outline">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.76.46 3.43 1.28 4.91L2.06 22l5.23-1.35c1.44.78 3.06 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m4.88 13.38c-.28.43-.99.84-1.37 1s-.79.15-1.42-.09c-.63-.23-2.58-1.2-4.9-3.01s-3.9-4.23-4.08-4.4c-.18-.18-.36-.28-.54-.28-.18 0-.36-.05-.54-.05s-.31.05-.44.1c-.13.05-.28.23-.41.41s-.28.46-.39.73c-.11.28-.21.58-.21.91s.11.96.21 1.14c.1.18.21.36.31.46.2.2.33.36.5.58.17.23.28.41.41.64.13.23.21.41.28.51.25.35.49.7.79 1.1.52.71 1.14 1.38 1.88 1.94.88.65 1.86 1.03 2.82 1.23.96.2 1.9-.05 2.58-.81.68-.75.68-1.5.68-1.5s-.02-.05-.04-.08c-.02-.03-.04-.05-.05-.08s-.04-.05-.05-.08c-.02-.03-.04-.05-.05-.08s-.04-.05-.05-.08c-.02-.03-.04-.05-.05-.08s-.04-.05-.05-.08c-.02-.03-.04-.05-.05-.08s-.04-.05-.05-.08l-.05-.07-.05-.08-.04-.05c-.02-.03-.04-.05-.05-.08l-.05-.07-.04-.05c-.02-.03-.04-.05-.05-.08l-.05-.07c-.01-.02-.03-.04-.04-.05l-.05-.08c-.01-.02-.03-.04-.04-.05l-.05-.08c-.01-.02-.03-.04-.04-.05l-.05-.08c-.01-.02-.03-.04-.04-.05l-.05-.08c-.01-.02-.03-.04-.04-.05l-.04-.05c-.02-.03-.03-.05-.04-.08l-.05-.07c-.01-.02-.03-.04-.04-.05l-.04-.05c-.02-.03-.03-.05-.04-.08l-.05-.07c-.01-.02-.03-.04-.04-.05l-.04-.05c-.02-.03-.03-.05-.04-.08l-.04-.05c-.01-.02-.02-.04-.04-.05l-.04-.05c-.01-.02-.02-.04-.04-.05l-.04-.05c-.01-.02-.02-.04-.04-.05l-.04-.05c-.01-.02-.02-.04-.03-.05l-.04-.05c-.01-.02-.02-.04-.03-.05l-.04-.05c-.01-.02-.02-.03-.03-.05l-.04-.05c-.01-.02-.02-.03-.03-.05l-.04-.05c-.01-.02-.02-.03-.03-.05l-.03-.05c-.01-.02-.02-.03-.03-.05l-.03-.04c-.01-.02-.02-.03-.03-.05l-.03-.04c-.01-.02-.02-.03-.03-.05l-.03-.04c-.01-.02-.02-.03-.02-.05l-.03-.04c-.01-.02-.02-.03-.02-.05l-.03-.04c-.01-.02-.02-.03-.02-.05l-.03-.04c-.01-.02-.02-.03-.02-.05l-.02-.03c-.01-.02-.02-.03-.02-.05l-.02-.03c-.01-.02-.02-.03-.02-.05l-.02-.03c-.01-.02-.01-.03-.02-.05l-.02-.03c-.01-.02-.01-.03-.02-.05l-.02-.03c-.01-.02-.01-.03-.02-.04l-.01-.03c-.01-.02-.01-.03-.02-.04l-.01-.03c-.01-.02-.01-.03-.01-.04l-.01-.03c0-.01-.01-.03-.01-.04l-.01-.03c0-.01-.01-.02-.01-.04l-.01-.03c0-.01,0-.02-.01-.03l0,0,0,0c0-.01,0-.02-.01-.03c0-.01-.01-.02-.01-.03l0,0,0,0c0-.01-.01-.02-.01-.03c0-.01-.01-.02-.01-.03l0,0,0,0c0-.01,0-.02-.01-.03l-.01-.03c0-.01,0-.02-.01-.03l-.01-.03c0-.01,0-.02-.01-.03l-.01-.03c0-.01-.01-.02-.01-.03l-.01-.03c0-.01,0-.02,0-.03l-.01-.03c0-.01,0-.02,0-.03l0-.03c0-.01,0-.02,0-.03l0-.03c0-.01,0-.02,0-.03l0-.03c0,0,0-.01,0-.02l0-.03c0,0,0-.01,0-.02l0-.03c0,0,0-.01,0-.02l0-.02c0,0,0-.01,0-.02l0-.02c0,0,0-.01,0-.02l0-.02c0,0,0-.01,0-.01l0-.02c0,0,0-.01,0-.01l0-.02c0,0,0,0,0-.01l0-.02c0,0,0,0,0-.01l0-.02c0,0,0,0,0,0l0-.02c0,0,0,0,0,0l0-.01c0,0,0,0,0,0l0,0c0,0,0,0,0,0l0,0,0,0c0,0,0,0,0,0l0,0,0,0c0,0,0,0,0,0,0,0c0,0,0,0,0,0,0,0,-1.02-1.89-1.99-3.23-2.79-1.34-.8-2.85-1.22-4.38-1.22-1.54,0-3.04.42-4.38,1.22-1.35.8-2.52,1.8-3.3,2.9-.78,1.1-1.22,2.37-1.22,3.67,0,1.3.44,2.57,1.22,3.67.78,1.1,1.95,2.1,3.3,2.9,1.34.8,2.84,1.22,4.38,1.22,1.53,0,3.03-.42,4.38-1.22,1.37-.8,2.53-1.8,3.3-2.9.77-1.1,1.22-2.37,1.22-3.67,0-1.3-.45-2.57-1.22-3.67Z"/></svg>
                    WhatsApp
                </Button>
                 <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                </Button>
                <Button variant="outline" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Friend's Name</TableHead>
                <TableHead>Date Invited</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {referralHistory.length > 0 ? referralHistory.map(ref => (
                     <TableRow key={ref.name}>
                        <TableCell className="font-medium">{ref.name}</TableCell>
                        <TableCell>{ref.date}</TableCell>
                        <TableCell>
                            <Badge variant={ref.status === 'Booked' ? 'default' : 'secondary'}>{ref.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{ref.reward}</TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                            No referral history yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Referral rewards are subject to terms and conditions. Please review them for details on eligibility and payouts.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground">Find answers to common questions about our referral program.</p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
