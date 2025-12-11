
'use client';

import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Camera,
  Search,
  CheckCircle,
  Package,
} from 'lucide-react';

interface IntakeScannerProps {
  onBack: () => void;
  onComplete: () => void;
  scanType: 'Driver' | 'Customer';
}

type ScanStep = 'scan' | 'confirm';

const mockOrder = {
  id: '#YL12345',
  customer: 'Jane Doe',
  service: 'Wash & Fold',
  bags: 2,
};

export function IntakeScanner({ onBack, onComplete, scanType }: IntakeScannerProps) {
  const [step, setStep] = useState<ScanStep>('scan');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [manualOrderId, setManualOrderId] = useState('');

  const getCameraPermission = async () => {
    if (hasCameraPermission === true) return;
    if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
      console.error('getUserMedia is not supported in this browser.');
      setHasCameraPermission(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
    }
  };

  useEffect(() => {
    if (step === 'scan') {
      getCameraPermission();
    }
  }, [step]);

  const handleManualFind = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualOrderId) {
      toast({
        title: 'Searching for order...',
        description: `Looking up details for order ${manualOrderId}.`,
      });
      setTimeout(() => {
        setStep('confirm');
      }, 1000);
    }
  };

  if (step === 'confirm') {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Confirm Order Intake</DialogTitle>
          <DialogDescription>
            You are checking in the following order.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
             <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg">{mockOrder.id}</h3>
                        <p className="text-muted-foreground">{mockOrder.customer}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{mockOrder.bags} bags</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{mockOrder.service}</span>
                </div>
            </div>
            <Separator />
            <div className="space-y-2">
                <Label htmlFor="intake-notes">Intake Notes (optional)</Label>
                <Textarea
                id="intake-notes"
                placeholder="e.g., Stain on blue shirt, missing one sock."
                />
            </div>
        </div>
        <DialogFooter>
            <Button variant="ghost" onClick={() => setStep('scan')}>Back to Scanner</Button>
            <Button onClick={onComplete}><CheckCircle className="mr-2"/> Confirm Intake</Button>
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Scan {scanType} Drop-off</DialogTitle>
        <DialogDescription>
          Center the QR code on the order bag inside the frame.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 space-y-4">
        <div className="relative w-full aspect-square bg-black rounded-lg flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
          {hasCameraPermission === false && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-background/95">
                <Alert variant="destructive">
                <Camera className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                    Please allow camera access in your browser settings. You can enter the Order ID manually below.
                </AlertDescription>
                </Alert>
            </div>
          )}
          <div className="absolute inset-8 border-4 border-dashed border-gray-400 rounded-lg" />
        </div>
        
        <Button className="w-full" onClick={() => setStep('confirm')} disabled={!hasCameraPermission}>
          Simulate Scan
        </Button>

        <Separator />

        <div>
            <p className="text-sm text-muted-foreground text-center mb-2">Or enter the ID manually</p>
             <form className="flex gap-2" onSubmit={handleManualFind}>
                <Input
                    placeholder="Enter Order ID"
                    value={manualOrderId}
                    onChange={(e) => setManualOrderId(e.target.value)}
                />
                <Button type="submit" variant="secondary" disabled={!manualOrderId}>
                    <Search className="mr-2 h-4 w-4" />
                    Find
                </Button>
            </form>
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </DialogFooter>
    </>
  );
}

    