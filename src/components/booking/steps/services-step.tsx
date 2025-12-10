
'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Box, Sparkles, Truck } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const services = [
    { 
        id: 'wash', 
        name: 'Wash', 
        description: 'From R40.00 / per kg. For everyday laundry, bedsheets and towels.',
        preferences: [
            { id: 'mixed', name: 'Mixed Wash', description: 'All items washed together. Best for everyday clothes.' },
            { id: 'separate', name: 'Separate Wash', description: 'We\'ll separate whites and colors. Extra charge may apply.' },
        ],
        addOns: [
            { id: 'high-temp', name: 'High temperature wash (90°C)' }
        ]
    },
    { 
        id: 'dry-cleaning', 
        name: 'Dry Cleaning', 
        description: 'From R80.00 / per item. For items that need special care.' 
    },
    { 
        id: 'duvets', 
        name: 'Duvets & Bulky Items', 
        description: 'From R90.00 / per item. For larger items that require extra care.' 
    },
];

type Service = typeof services[0];

const nextSteps = [
    { icon: Box, text: "Prepare your bags" },
    { icon: Sparkles, text: "We wash & clean" },
    { icon: Truck, text: "We deliver" },
];

export default function ServicesStep() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const toggleService = (serviceId: string) => {
        const service = services.find(s => s.id === serviceId);
        if (!service) return;

        if (selectedServices.includes(serviceId)) {
            setSelectedServices(prev => prev.filter(id => id !== serviceId));
        } else {
             if (service.preferences) {
                setEditingService(service);
            } else {
                setSelectedServices(prev => [...prev, serviceId]);
            }
        }
    }
    
    const handleConfirmPreferences = () => {
        if (editingService) {
            setSelectedServices(prev => [...prev, editingService.id]);
            setEditingService(null);
        }
    }

    return (
         <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Book Your Service</h2>
                <p className="text-muted-foreground mt-1">Select one or more services for your laundry.</p>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Services & products</h3>
                <div className="rounded-lg border">
                    {services.map((service, index) => (
                        <div key={service.id}>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                    <Button variant="link" className="p-0 h-auto text-primary">See prices</Button>
                                </div>
                                <Button 
                                    variant={selectedServices.includes(service.id) ? 'outline' : 'default'}
                                    onClick={() => toggleService(service.id)}
                                >
                                    {selectedServices.includes(service.id) ? 'Edit' : 'Add'}
                                </Button>
                            </div>
                            {index < services.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!editingService} onOpenChange={(isOpen) => !isOpen && setEditingService(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Please select your preference for {editingService?.name}</DialogTitle>
                        <DialogDescription>Let us know how you'd like us to handle your wash items.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        {editingService?.preferences && (
                            <RadioGroup defaultValue={editingService.preferences[0].id}>
                                {editingService.preferences.map(pref => (
                                    <Label key={pref.id} htmlFor={pref.id} className="block p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                        <RadioGroupItem value={pref.id} id={pref.id} className="sr-only" />
                                        <p className="font-semibold">{pref.name}</p>
                                        <p className="text-sm text-muted-foreground">{pref.description}</p>
                                    </Label>
                                ))}
                            </RadioGroup>
                        )}
                        {editingService?.addOns && editingService.addOns.length > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    {editingService.addOns.map(addOn => (
                                        <div key={addOn.id} className="flex items-center space-x-2">
                                            <Checkbox id={addOn.id} />
                                            <Label htmlFor={addOn.id}>{addOn.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <DialogClose asChild>
                         <Button className="w-full mt-4" onClick={handleConfirmPreferences}>Confirm</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

             <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <Info className="h-4 w-4 !text-blue-800" />
                <AlertDescription>
                   Do I need to list each item? Not before collection, it is not required. Simply keep your choice of services, then pack and bag your items.
                </AlertDescription>
            </Alert>

             <div>
                <h3 className="font-semibold text-center mb-4">What happens next?</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {nextSteps.map(step => (
                         <div key={step.text} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted mb-2">
                                <step.icon className="h-6 w-6 text-muted-foreground"/>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
