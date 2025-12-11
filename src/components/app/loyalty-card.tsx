
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
import { Star } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const rewards = [
    { name: 'R50 Off Your Next Order', cost: 5000 },
    { name: 'Free Delivery', cost: 2500 },
    { name: 'Free Ironing (5 items)', cost: 7500 },
    { name: 'Plant a Tree', cost: 1000 },
]

export function LoyaltyCard() {
    const [points, setPoints] = useState(1245);
    const { toast } = useToast();
    const nextRewardTier = 5000;

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
    );
}
