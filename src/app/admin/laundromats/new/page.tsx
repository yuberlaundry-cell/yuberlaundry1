
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building, Check, DollarSign, Mail, Percent, Phone, User, Wand2, StepForward } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AddressInput } from '@/components/ui/address-input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Facility Details', icon: Building },
  { id: 2, name: 'Primary Contact', icon: User },
  { id: 3, name: 'Financials', icon: DollarSign },
  { id: 4, name: 'Confirmation', icon: Check },
];

export default function NewLaundromatPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [address, setAddress] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const handleFinish = () => {
        toast({
            title: "Laundromat Onboarded!",
            description: "The new facility is now active on the platform.",
        });
        router.push('/admin/laundromats');
    }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="-ml-4">
            <Link href="/admin/laundromats">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Laundromats
            </Link>
          </Button>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl mt-2">Onboard New Laundromat</h1>
          <p className="text-muted-foreground">
            Follow these steps to add a new partner facility to the platform.
          </p>
        </div>
      </div>

       <div className="flex items-center justify-center mb-8">
          <div className="flex w-full max-w-lg items-center">
            {steps.map((step, index) => (
              <>
                <div key={step.id} className="flex flex-col items-center text-center">
                   <div className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {currentStep > step.id ? <Check /> : <step.icon className="h-5 w-5" />}
                   </div>
                    <p className={`mt-2 text-xs font-medium ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
                </div>
                {index < steps.length - 1 && <div className={`flex-1 h-1 rounded-full mx-2 ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'}`} />}
              </>
            ))}
          </div>
        </div>

        <Card>
            <form onSubmit={handleNext}>
                <CardContent className="p-6">
                    {currentStep === 1 && (
                         <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="facility-name">Facility Name</Label>
                                <Input id="facility-name" placeholder="e.g., Speedy Suds" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="facility-address">Address</Label>
                                 <AddressInput
                                    id="facility-address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onAddressSelect={(addr) => setAddress(addr.description)}
                                    required
                                />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="open-time">Opening Time</Label>
                                    <Input id="open-time" type="time" defaultValue="08:00" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="close-time">Closing Time</Label>
                                    <Input id="close-time" type="time" defaultValue="22:00" required />
                                </div>
                            </div>
                        </div>
                    )}
                     {currentStep === 2 && (
                         <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="contact-name">Primary Contact Name</Label>
                                <Input id="contact-name" placeholder="e.g., Maria Garcia" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact-email">Contact Email</Label>
                                    <Input id="contact-email" type="email" placeholder="maria@speedysuds.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-phone">Contact Phone</Label>
                                    <Input id="contact-phone" type="tel" placeholder="+27 82 123 4567" required />
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="commission-model">Commission Model</Label>
                                <Select defaultValue="default">
                                    <SelectTrigger id="commission-model">
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Platform Default (15%)</SelectItem>
                                        <SelectItem value="custom">Custom Override</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                            <div>
                                <h4 className="font-medium text-lg mb-1">Payout Details</h4>
                                <p className="text-sm text-muted-foreground mb-4">Enter the bank details where payouts will be sent via Paystack.</p>
                                <div className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="bank-name">Bank Name</Label>
                                        <Select name="bank-code" required>
                                            <SelectTrigger id="bank-name">
                                                <SelectValue placeholder="Select a bank"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="058">Guaranty Trust Bank</SelectItem>
                                                <SelectItem value="011">First Bank of Nigeria</SelectItem>
                                                <SelectItem value="057">Zenith Bank</SelectItem>
                                                <SelectItem value="044">Access Bank</SelectItem>
                                                <SelectItem value="standard-bank">Standard Bank (South Africa)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="account-number">Account Number</Label>
                                        <Input id="account-number" placeholder="Enter account number" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="account-name">Account Holder Name</Label>
                                        <Input id="account-name" placeholder="Name is verified via Paystack" readOnly />
                                        <p className="text-xs text-muted-foreground">Account name is automatically verified and populated.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div className="text-center p-8">
                             <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full bg-green-100 text-green-700">
                                    <Check className="h-10 w-10" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold font-headline">Ready to Go!</h2>
                            <p className="text-muted-foreground mt-2">You've entered all the necessary details to onboard Speedy Suds.</p>
                            <p className="text-muted-foreground">Click 'Finish Onboarding' to activate the facility.</p>
                        </div>
                    )}
                </CardContent>
                <Separator />
                <div className="p-6 flex justify-between">
                    {currentStep > 1 && currentStep < steps.length && (
                        <Button variant="outline" type="button" onClick={handlePrev}>Previous</Button>
                    )}
                    {currentStep < steps.length - 1 && <div />}
                    {currentStep < steps.length -1 && (
                         <Button type="submit">
                            Next <StepForward className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="submit">
                           Next <Wand2 className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                     {currentStep === steps.length && (
                        <Button className="w-full" type="button" onClick={handleFinish}>
                           <Check className="mr-2 h-4 w-4" /> Finish Onboarding
                        </Button>
                    )}
                </div>
            </form>
        </Card>

    </div>
  )
}
