
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function PromotionsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage your recurring laundry plans.
        </p>
      </div>

      <Card className="flex items-center justify-center h-96">
        <CardContent className="text-center">
            <div className="flex justify-center mb-4">
                <div className="bg-secondary rounded-full p-4">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
            <h2 className="text-xl font-semibold">No Subscriptions Found</h2>
            <p className="text-muted-foreground mt-2 mb-4">
                You don't have any active recurring orders.
            </p>
            <Button>Set up a recurring order</Button>
        </CardContent>
      </Card>
    </div>
  );
}
