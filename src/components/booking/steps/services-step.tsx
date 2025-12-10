
'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Box, Sparkles, Truck } from "lucide-react";
import { useState } from "react";

const services = [
    { 
        id: 'wash', 
        name: 'Wash', 
        description: 'From R40.00 / per kg. For everyday laundry, bedsheets and towels.' 
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

const nextSteps = [
    { icon: Box, text: "Prepare your bags" },
    { icon: Sparkles, text: "We wash & clean" },
    { icon: Truck, text: "We deliver" },
];

export default function ServicesStep() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev => 
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
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
                                    variant={selectedServices.includes(service.id) ? 'secondary' : 'default'}
                                    onClick={() => toggleService(service.id)}
                                >
                                    {selectedServices.includes(service.id) ? 'Remove' : 'Add'}
                                </Button>
                            </div>
                            {index < services.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </div>

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
