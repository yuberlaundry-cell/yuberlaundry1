

'use client';

import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Camera,
  Search,
  CheckCircle,
  Package,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

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
  const [bags, setBags] = useState(mockOrder.bags);
  const [notes, setNotes] = useState('');

  const getCameraPermission = async () => {
    if (hasCameraPermission === true) return;
    if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
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

  const renderContent = () => {
    if (step === 'confirm') {
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Confirm Order Intake</CardTitle>
            <CardDescription>Verify the details for this order before checking it in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="font-semibold text-lg">{mockOrder.id}</h3>
                          <p className="text-muted-foreground">{mockOrder.customer}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">{mockOrder.service}</span>
                  </div>
              </div>
              <Separator />
               <div className="space-y-2">
                  <Label htmlFor="bags">Number of Bags</Label>
                  <Input id="bags" type="number" value={bags} onChange={(e) => setBags(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="intake-notes">Intake Notes (optional)</Label>
                  <Textarea id="intake-notes" placeholder="e.g., Stain on blue shirt, missing one sock." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
               <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={() => setStep('scan')}>Back to Scanner</Button>
                    <Button onClick={onComplete}><CheckCircle className="mr-2"/> Confirm Intake</Button>
               </div>
          </CardContent>
        </Card>
      );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
             <CardHeader>
                <CardTitle>Scan {scanType} Drop-off</CardTitle>
                <CardDescription>
                Center the QR code on the order bag inside the frame.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="relative w-full aspect-square bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline/>
                    {hasCameraPermission === false && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-background/95">
                            <Alert variant="destructive"><Camera className="h-4 w-4" /><AlertTitle>Camera Access Required</AlertTitle><AlertDescription>Please allow camera access. You can enter the Order ID manually below.</AlertDescription></Alert>
                        </div>
                    )}
                    <div className="absolute inset-8 border-4 border-dashed border-gray-400 rounded-lg" />
                </div>
                 <Button className="w-full" onClick={() => setStep('confirm')} disabled={hasCameraPermission !== true}>Simulate Scan</Button>
                <Separator />
                <div>
                    <p className="text-sm text-muted-foreground text-center mb-2">Can't scan or no camera?</p>
                    <form className="flex gap-2" onSubmit={handleManualFind}>
                        <Input placeholder="Enter Order ID" value={manualOrderId} onChange={(e) => setManualOrderId(e.target.value)} />
                        <Button type="submit" variant="secondary" disabled={!manualOrderId}><Search className="mr-2 h-4 w-4" />Find</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="space-y-4">
        <Button variant="ghost" onClick={onBack}><ArrowLeft className="mr-2"/>Back to Intake Type</Button>
        {renderContent()}
    </div>
  );
}
