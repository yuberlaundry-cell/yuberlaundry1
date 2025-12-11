
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScanLine, UserPlus, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IntakeFlow } from '@/components/laundromat/intake-flow';

const orderToCome = {
  id: '#YL12345',
  customer: 'Jane Doe',
  service: 'Wash & Fold',
  bags: 2,
};

export default function IntakePage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Order Intake</h1>
        <p className="text-muted-foreground">
          Check-in driver drop-offs, customer drop-offs, and walk-ins.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start New Intake</CardTitle>
          <CardDescription>
            Begin the check-in process for any type of order drop-off.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full h-12 text-base">
                <ScanLine className="mr-2" /> Start Intake
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
               <IntakeFlow />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
