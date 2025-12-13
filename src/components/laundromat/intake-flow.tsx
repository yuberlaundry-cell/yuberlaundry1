
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateWalkinFlow } from './create-walkin-flow';
import { IntakeScanner } from './intake-scanner';
import { Button } from '../ui/button';
import { ArrowLeft, HardHat, ScanLine, User } from 'lucide-react';
import Link from 'next/link';

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
  const router = useRouter();

  const resetAndGoToIntake = () => {
    setStep('select_type');
    router.push('/laundromat/intake');
  }

  if (step === 'scan_driver') {
    return (
      <IntakeScanner
        onBack={() => setStep('select_type')}
        onComplete={resetAndGoToIntake}
        scanType="Driver"
      />
    );
  }

  if (step === 'scan_customer') {
    return (
      <IntakeScanner
        onBack={() => setStep('select_type')}
        onComplete={resetAndGoToIntake}
        scanType="Customer"
      />
    );
  }

  if (step === 'walk_in') {
    return (
      <CreateWalkinFlow
        onBack={() => setStep('select_type')}
        onComplete={resetAndGoToIntake}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
        <div>
            <Button variant="ghost" asChild className="-ml-4">
                <Link href="/laundromat/intake"><ArrowLeft className="mr-2" /> Back to Intake</Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline mt-4">Start a New Intake</h1>
            <p className="text-muted-foreground">
                How is this order arriving at the facility?
            </p>
        </div>
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
    </div>
  );
}
