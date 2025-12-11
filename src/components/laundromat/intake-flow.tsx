
'use client';

import { useState } from 'react';
import { DialogClose } from '@/components/ui/dialog';
import { CreateWalkinFlow } from './create-walkin-flow';
import { IntakeScanner } from './intake-scanner';
import { Button } from '../ui/button';
import { HardHat, ScanLine, User } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

type IntakeStep = 'select_type' | 'scan_driver' | 'scan_customer' | 'walk_in';

const intakeTypes = [
  {
    type: 'scan_driver',
    title: 'Scan Driver Drop-off',
    description: 'For orders arriving via Yuber driver.',
    icon: HardHat,
  },
  {
    type: 'scan_customer',
    title: 'Scan Customer Drop-off',
    description: 'For existing customers with a QR code.',
    icon: ScanLine,
  },
  {
    type: 'walk_in',
    title: 'Create Walk-in Order',
    description: 'For new customers without an account.',
    icon: User,
  },
] as const;

export function IntakeFlow() {
  const [step, setStep] = useState<IntakeStep>('select_type');

  const resetFlow = () => setStep('select_type');

  if (step === 'scan_driver') {
    return (
      <IntakeScanner
        onBack={() => setStep('select_type')}
        onComplete={resetFlow}
        scanType="Driver"
      />
    );
  }

  if (step === 'scan_customer') {
    return (
      <IntakeScanner
        onBack={() => setStep('select_type')}
        onComplete={resetFlow}
        scanType="Customer"
      />
    );
  }

  if (step === 'walk_in') {
    return (
      <CreateWalkinFlow
        onBack={() => setStep('select_type')}
        onComplete={resetFlow}
      />
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Start a New Intake</DialogTitle>
        <DialogDescription>
          How is this order arriving at the facility?
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-3 py-4">
        {intakeTypes.map((type) => (
          <Button
            key={type.type}
            variant="outline"
            className="w-full h-auto p-4 justify-start text-left"
            onClick={() => setStep(type.type as IntakeStep)}
          >
            <div className="flex items-start gap-4">
              <type.icon className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold">{type.title}</p>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
    </>
  );
}
