
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, ShoppingBag, Calendar, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AddressInput } from "@/components/ui/address-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { id: 1, name: 'Employee', icon: User },
  { id: 2, name: 'Services', icon: ShoppingBag },
  { id: 3, name: 'Schedule', icon: Calendar },
  { id: 4, name: 'Confirm', icon: Check },
];

const servicesConfig = [
  { id: 'wash-fold', name: 'Wash & Fold' },
  { id: 'dry-cleaning', name: 'Dry Cleaning' },
  { id: 'ironing', name: 'Ironing' },
];

const savedAddresses = [
    { id: 'home', type: 'Employee Home', address: '123 Main St, London, SW1A 0AA' },
    { id: 'work', type: 'Company HQ', address: '456 Business Rd, London, EC1A 1BB' },
];


export default function NewBusinessOrderPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [pickupAddress, setPickupAddress] = useState('work');
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
            title: "Order Created!",
            description: "The new order has been placed and the employee has been notified.",
        });
        router.push('/business/orders');
    }
    
    const progress = (currentStep / steps.length) * 100;
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <Label htmlFor="employee">Select Employee</Label>
                        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                            <SelectTrigger id="employee">
                                <SelectValue placeholder="Select an employee..." />
                            </SelectTrigger>
                            <SelectContent>
                                {mockBusinessEmployees.filter(e => e.status === 'Active').map(employee => (
                                    <SelectItem key={employee.id} value={employee.id}>
                                        {employee.name} ({employee.email})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )
            case 2:
                return (
                     <div className="space-y-4">
                        <Label>Services</Label>
                        {servicesConfig.map(service => (
                            <div key={service.id} className="flex items-center space-x-2 p-3 border rounded-md">
                                <Checkbox id={service.id} />
                                <Label htmlFor={service.id} className="font-normal cursor-pointer flex-grow">{service.name}</Label>
                            </div>
                        ))}
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Pickup Address</Label>
                            <RadioGroup value={pickupAddress} onValueChange={setPickupAddress} className="space-y-2">
                                {savedAddresses.map(addr => (
                                     <Label key={addr.id} htmlFor={`pickup-${addr.id}`} className="flex items-center p-3 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                        <RadioGroupItem value={addr.id} id={`pickup-${addr.id}`} className="mr-3"/>
                                        <div>
                                            <p className="font-medium">{addr.type}</p>
                                            <p className="text-sm text-muted-foreground">{addr.address}</p>
                                        </div>
                                    </Label>
                                ))}
                            </RadioGroup>
                             <div className="pt-2">
                                <AddressInput placeholder="Or enter a new address..."/>
                            </div>
                        </div>
                        <Separator />
                         <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickup-date">Pickup Date</Label>
                                <Input id="pickup-date" type="date" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="pickup-time">Pickup Time</Label>
                                <Select>
                                    <SelectTrigger id="pickup-time">
                                        <SelectValue placeholder="Select a time slot"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (1pm - 5pm)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )
             case 4:
                const employee = mockBusinessEmployees.find(e => e.id === selectedEmployee);
                return (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold">Employee</h4>
                            <p className="text-muted-foreground">{employee?.name}</p>
                        </div>
                        <Separator />
                        <div className="space-y-1">
                            <h4 className="font-semibold">Services</h4>
                            <p className="text-muted-foreground">Wash & Fold, Dry Cleaning</p>
                        </div>
                        <Separator/>
                        <div className="space-y-1">
                            <h4 className="font-semibold">Schedule & Address</h4>
                            <p className="text-muted-foreground">Pickup from Company HQ on {new Date().toLocaleDateString()}</p>
                        </div>
                        <Separator />
                         <div className="space-y-2">
                            <Label htmlFor="notes">Special Instructions (optional)</Label>
                            <Textarea id="notes" placeholder="e.g., Use hypoallergenic detergent." />
                        </div>
                    </div>
                )
            default: return null;
        }
    }


    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/orders">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all orders
                    </Link>
                </Button>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <Progress value={progress} className="mb-4 h-2" />
                    <CardTitle className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                           {steps[currentStep - 1]?.icon && React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                        </div>
                       Step {currentStep}: {steps[currentStep-1]?.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {renderStepContent()}
                     <div className="flex justify-between mt-8 pt-6 border-t">
                        {currentStep > 1 ? (
                            <Button variant="outline" onClick={handlePrev}>Previous Step</Button>
                        ) : <div />}

                        {currentStep < steps.length ? (
                            <Button onClick={handleNext} disabled={currentStep === 1 && !selectedEmployee}>Next Step</Button>
                        ) : (
                             <Button onClick={handleFinish}>Create Order</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
