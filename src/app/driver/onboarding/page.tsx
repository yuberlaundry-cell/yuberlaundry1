
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Check, FileUp, User, Car, Banknote } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const steps = [
  { id: 1, name: 'Personal Details', icon: User },
  { id: 2, name: 'Vehicle Info', icon: Car },
  { id: 3, name: 'Documents', icon: FileUp },
  { id: 4, name: 'Payout Details', icon: Banknote },
  { id: 5, name: 'Review & Submit', icon: Check },
];

export default function DriverOnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const { toast } = useToast();
    const router = useRouter();

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
        toast({
            title: "Application Submitted!",
            description: "We're reviewing your application and will notify you once you're approved.",
        });
        router.push('/driver');
    }

    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Doe" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john.doe@email.com" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <PhoneNumberInput />
                        </div>
                    </form>
                );
            case 2:
                 return (
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="vehicle-type">Vehicle Type</Label>
                            <Select required>
                                <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="scooter">Scooter</SelectItem>
                                    <SelectItem value="car">Car</SelectItem>
                                    <SelectItem value="van">Van</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="vehicle-model">Model & Color</Label>
                            <Input id="vehicle-model" placeholder="e.g., Blue Toyota Prius" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="license-plate">License Plate Number</Label>
                            <Input id="license-plate" placeholder="e.g., GP 123 ABC" required />
                        </div>
                    </form>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="driver-license">Driver's License</Label>
                            <Input id="driver-license" type="file" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="vehicle-insurance">Proof of Vehicle Insurance</Label>
                            <Input id="vehicle-insurance" type="file" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="id-document">ID Document or Passport</Label>
                            <Input id="id-document" type="file" />
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
                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold">Review Your Application</h3>
                        <p className="text-muted-foreground mt-2">Please review your information before submitting. You can go back to edit any details.</p>
                    </div>
                )
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
