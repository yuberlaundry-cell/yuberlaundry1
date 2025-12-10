
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
import { Camera, CheckCircle, ScanLine, Search, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';


const orderToCome = {
  id: '#YL12345',
  customer: 'Jane Doe',
  service: 'Wash & Fold',
  bags: 2,
  notes: 'Customer requested hypoallergenic detergent.',
};

export default function IntakePage() {
    const { toast } = useToast();
    const [isScannerOpen, setScannerOpen] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [manualOrderId, setManualOrderId] = useState('');

    const getCameraPermission = async () => {
        if (hasCameraPermission) return true;
        if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
            console.error('getUserMedia is not supported in this browser.');
            setHasCameraPermission(false);
            return false;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings to use the scanner.',
            });
            return false;
        }
    };

    useEffect(() => {
        if(isScannerOpen) {
            getCameraPermission();
        }
    }, [isScannerOpen]);

    const handleFindOrder = (e: React.FormEvent) => {
      e.preventDefault();
      if (manualOrderId) {
        toast({
          title: 'Searching for order...',
          description: `Looking up details for order ${manualOrderId}.`
        })
      }
    }

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
              <CardTitle>In-Store Drop-off</CardTitle>
              <CardDescription>
                Create a new order for a walk-in customer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <UserPlus className="mr-2" /> Create Walk-in Order
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code (Driver Drop-off)</CardTitle>
              <CardDescription>
                Use the camera to scan the QR code on the order bag.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Dialog open={isScannerOpen} onOpenChange={setScannerOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <ScanLine className="mr-2" /> Start Scanner
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Scan Order QR Code</DialogTitle>
                            <DialogDescription>
                                Center the QR code on the order bag inside the frame.
                            </DialogDescription>
                        </DialogHeader>
                         <div className="relative w-full aspect-square bg-black rounded-lg flex items-center justify-center overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                                    <Camera className="h-12 w-12 text-gray-500 mb-4" />
                                    <p className="text-center">Camera access is required to scan QR codes.</p>
                                </div>
                            )}
                            <div className="absolute top-8 bottom-8 left-8 right-8 border-4 border-dashed border-gray-400 rounded-lg"/>
                        </div>
                        <Button onClick={() => setScannerOpen(false)}>Close Scanner</Button>
                    </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Manual Entry</CardTitle>
               <CardDescription>
                If a QR code is not available, enter the order ID manually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex gap-2" onSubmit={handleFindOrder}>
                  <Input 
                    placeholder="Enter Order ID, e.g., #YL12345" 
                    value={manualOrderId}
                    onChange={(e) => setManualOrderId(e.target.value)}
                  />
                  <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Find Order
                  </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky top-24 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Arriving Soon via Driver</CardTitle>
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
