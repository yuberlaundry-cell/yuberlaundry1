
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, ShoppingBag, Calendar, Check, Waves, Shirt } from "lucide-react";
import Link from "next/link";
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
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

const steps = [
  { id: 1, name: 'Employee', icon: User },
  { id: 2, name: 'Services', icon: ShoppingBag },
  { id: 3, name: 'Schedule', icon: Calendar },
  { id: 4, name: 'Confirm', icon: Check },
];

const servicesConfig = [
    {
        id: 'wash-fold',
        name: 'Wash & Fold',
        icon: Waves,
        description: 'For everyday laundry, bedsheets and towels.',
        preferences: {
            title: 'Please select your preference for Wash & Fold',
            options: [
                { id: 'mixed', name: 'Mixed Wash', price: 'R39.75 / kg' },
                { id: 'separate', name: 'Separate Wash', price: 'R79.50 / kg' },
            ],
            description: "We'll separate the lights and darks for you."
        },
        addOns: [
            { id: 'high-temp', name: 'High temperature wash', description: "Items will be washed at a higher temperature. Please check labels before selecting." }
        ]
    },
    {
        id: 'dry-cleaning',
        name: 'Dry Cleaning',
        icon: Shirt,
        description: 'For delicate items that require special care.',
    },
];

type Service = typeof servicesConfig[0];
type ServicePreferences = {
    [key: string]: {
        washType?: string;
        highTemp?: boolean;
    }
}


const savedAddresses = [
    { id: 'home', type: 'Employee Home', address: '123 Main St, London, SW1A 0AA' },
    { id: 'work', type: 'Company HQ', address: '456 Business Rd, London, EC1A 1BB' },
];


export default function NewBusinessOrderPage() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'business_admin';

    const [currentStep, setCurrentStep] = useState(isAdmin ? 1 : 2);
    const [selectedEmployee, setSelectedEmployee] = useState(isAdmin ? '' : user?.id || '');
    const [pickupAddress, setPickupAddress] = useState('work');
    const { toast } = useToast();
    const router = useRouter();

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [servicePreferences, setServicePreferences] = useState<ServicePreferences>({});
    const [tempWashPref, setTempWashPref] = useState<string | undefined>(undefined);
    const [tempHighTemp, setTempHighTemp] = useState<boolean>(false);

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentStep > 1) {
            // Skip step 1 for non-admins
            if (!isAdmin && currentStep === 2) {
                router.push('/business'); // or wherever back should go from step 2 for employees
                return;
            }
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

    const openServiceDialog = (service: Service) => {
        const currentPrefs = servicePreferences[service.id];
        setTempWashPref(currentPrefs?.washType || service.preferences?.options[0].id);
        setTempHighTemp(currentPrefs?.highTemp || false);
        setEditingService(service);
    };

    const toggleService = (serviceId: string) => {
        const service = servicesConfig.find(s => s.id === serviceId);
        if (!service) return;

        if (service.preferences || service.addOns) {
            openServiceDialog(service);
        } else {
            setSelectedServices(prev =>
                prev.includes(serviceId)
                    ? prev.filter(id => id !== serviceId)
                    : [...prev, serviceId]
            );
        }
    }

    const handleConfirmPreferences = () => {
        if (editingService) {
            setServicePreferences(prev => ({
                ...prev,
                [editingService.id]: {
                    washType: tempWashPref,
                    highTemp: tempHighTemp,
                }
            }));
            if (!selectedServices.includes(editingService.id)) {
                setSelectedServices(prev => [...prev, editingService.id]);
            }
            setEditingService(null);
        }
    }
    
    const progress = (currentStep / steps.length) * 100;
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                if (!isAdmin) return null; // Should not happen if logic is correct
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
                        <div className="rounded-lg border">
                            {servicesConfig.map((service, index) => (
                                <div key={service.id}>
                                    <div className="p-4 flex items-start gap-4">
                                        <div className="p-3 bg-muted rounded-full">
                                            <service.icon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{service.name}</p>
                                            <p className="text-sm text-muted-foreground">{service.description}</p>
                                        </div>
                                        <Button
                                            variant={selectedServices.includes(service.id) ? 'outline' : 'default'}
                                            onClick={() => toggleService(service.id)}
                                        >
                                            {selectedServices.includes(service.id) ? 'Edit' : 'Add'}
                                        </Button>
                                    </div>
                                    {index < servicesConfig.length - 1 && <Separator />}
                                </div>
                            ))}
                        </div>
                        <Dialog open={!!editingService} onOpenChange={(isOpen) => !isOpen && setEditingService(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingService?.preferences?.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                    {editingService?.preferences && (
                                        <>
                                            <RadioGroup
                                                value={tempWashPref}
                                                onValueChange={setTempWashPref}
                                                className="grid grid-cols-2 gap-4"
                                            >
                                                {editingService.preferences.options.map(opt => (
                                                    <Label key={opt.id} htmlFor={opt.id} className="block p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary text-center">
                                                        <RadioGroupItem value={opt.id} id={opt.id} className="sr-only" />
                                                        <p className="font-semibold">{opt.name}</p>
                                                        <p className="text-sm text-muted-foreground">{opt.price}</p>
                                                    </Label>
                                                ))}
                                            </RadioGroup>
                                            <p className="text-sm text-muted-foreground">{editingService.preferences.description}</p>
                                        </>
                                    )}
                                    {editingService?.addOns && editingService.addOns.length > 0 && (
                                        <>
                                            <Separator />
                                            <div className="space-y-3">
                                                {editingService.addOns.map(addOn => (
                                                    <Label key={addOn.id} htmlFor={addOn.id} className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                                        <Checkbox
                                                            id={addOn.id}
                                                            checked={tempHighTemp}
                                                            onCheckedChange={(checked) => setTempHighTemp(Boolean(checked))}
                                                            className="mt-1"
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-semibold">{addOn.name}</p>
                                                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Free</Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{addOn.description}</p>
                                                        </div>
                                                    </Label>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button className="w-full mt-4" size="lg" onClick={handleConfirmPreferences}>
                                    {selectedServices.includes(editingService?.id || '') ? 'Save Changes' : 'Add Service'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                            <p className="text-muted-foreground">{selectedServices.map(s => servicesConfig.find(sc => sc.id === s)?.name).join(', ')}</p>
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
