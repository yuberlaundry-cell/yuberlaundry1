
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Banknote, Building, Check, FileUp, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressInput } from '@/components/ui/address-input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Facility Details', icon: Building },
  { id: 2, name: 'Primary Contact', icon: User },
  { id: 3, name: 'Documents', icon: FileUp },
  { id: 4, name: 'Payout Details', icon: Banknote },
  { id: 5, name: 'Review & Submit', icon: Check },
];

export default function LaundromatOnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const [address, setAddress] = useState('');

    const handleNext = () => {
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
        router.push('/laundromat/onboarding/submitted');
    }

    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
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
                );
            case 2:
                 return (
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
                                <PhoneNumberInput />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                     <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="business-reg">Business Registration Document</Label>
                            <Input id="business-reg" type="file" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="id-document">Owner ID Document or Passport</Label>
                            <Input id="id-document" type="file" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="health-permit">Health & Safety Permit</Label>
                            <Input id="health-permit" type="file" />
                        </div>
                    </div>
                );
            case 4:
                return (
                     <form className="space-y-4">
                        <p className="text-sm text-muted-foreground">Earnings are sent to your bank account via Paystack.</p>
                         <div className="space-y-2">
                            <Label htmlFor="payout-country">Payout Country</Label>
                            <Select name="payout-country" required>
                                <SelectTrigger><SelectValue placeholder="Select a country"/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ZA">South Africa</SelectItem>
                                    <SelectItem value="NG">Nigeria</SelectItem>
                                    <SelectItem value="GH">Ghana</SelectItem>
                                    <SelectItem value="KE">Kenya</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Select name="bank-code" required>
                                <SelectTrigger><SelectValue placeholder="Select a bank"/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fnb-za">First National Bank (South Africa)</SelectItem>
                                    <SelectItem value="absa-za">ABSA (South Africa)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" placeholder="Enter account number" required />
                        </div>
                    </form>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center p-4">
                            <h3 className="text-xl font-semibold">Review Your Application</h3>
                            <p className="text-muted-foreground mt-2">Please review your information before submitting. You can go back to edit any details.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <Checkbox id="terms-agree" required/>
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="terms-agree">
                                    I agree to the <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                                </Label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-lg">
                 <CardHeader>
                    <Progress value={progress} className="mb-4 h-2" />
                    <div className="flex items-center justify-between">
                         {currentStep > 1 ? (
                            <Button variant="ghost" size="sm" onClick={handlePrev}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        ) : (
                             <Button variant="ghost" size="sm" asChild>
                                <Link href="/auth/register"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
                            </Button>
                        )}
                        <span className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</span>
                    </div>
                    <CardTitle className="pt-4">{steps[currentStep - 1].name}</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderStepContent()}
                    <div className="mt-8">
                        {currentStep < steps.length ? (
                            <Button className="w-full" onClick={handleNext}>Next</Button>
                        ) : (
                            <Button className="w-full" onClick={handleFinish}>Submit Application</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
