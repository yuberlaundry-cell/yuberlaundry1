'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Camera, CheckCircle, ScanLine, Search } from 'lucide-react';

const orderToCome = {
  id: '#YL12345',
  customer: 'Jane Doe',
  service: 'Wash & Fold',
  bags: 2,
  notes: 'Customer requested hypoallergenic detergent.',
};

export default function IntakePage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Order Intake</h1>
        <p className="text-muted-foreground">
          Scan or manually enter order IDs to check-in items.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Use the camera to scan the QR code on the order bag.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
                <Camera className="h-24 w-24 text-gray-600" />
                <div className="absolute top-8 bottom-8 left-8 right-8 border-4 border-dashed border-gray-400 rounded-lg" />
              </div>
              <Button className="w-full">
                <ScanLine className="mr-2" /> Start Scanner
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Manual Entry</CardTitle>
               <CardDescription>
                If the QR code is not available, enter the order ID manually.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Input placeholder="Enter Order ID, e.g., #YL12345" />
                <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Find Order
                </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky top-24 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Arriving Soon</CardTitle>
               <CardDescription>
                This order is scheduled for drop-off.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                             <h3 className="font-semibold text-lg">{orderToCome.id}</h3>
                             <p className="text-muted-foreground">{orderToCome.customer}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{orderToCome.bags} bags</p>
                    </div>
                    <p className="text-sm text-primary font-medium mt-2">{orderToCome.service}</p>
                </div>
                 <Separator />
                <div className="space-y-2">
                    <Label>Intake Notes</Label>
                    <Textarea placeholder="e.g., Stain on blue shirt, missing one sock." />
                </div>
                <Button className="w-full">
                    <CheckCircle className="mr-2" /> Confirm Intake
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
