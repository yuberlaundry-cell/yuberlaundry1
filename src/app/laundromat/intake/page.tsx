
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

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
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

        <div className="lg:sticky top-24 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Arriving Soon via Driver</CardTitle>
              <CardDescription>
                This order is scheduled for imminent drop-off by a driver.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{orderToCome.id}</h3>
                    <p className="text-muted-foreground">
                      {orderToCome.customer}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {orderToCome.bags} bags
                  </p>
                </div>
                <p className="text-sm text-primary font-medium mt-2">
                  {orderToCome.service}
                </p>
              </div>
              <Separator />
               <Button className="w-full" disabled>
                  <CheckCircle className="mr-2" /> Awaiting Drop-off
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
