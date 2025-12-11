
'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Box, Sparkles, Truck, Shirt, Waves } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const services = [
    {
        id: 'wash',
        name: 'Wash',
        icon: Waves,
        description: 'From R3.49 / per item',
        details: 'For everyday laundry, bedsheets and towels.',
        preferences: {
            title: 'Please select your preference for Wash',
            options: [
                { id: 'mixed', name: 'Mixed Wash', price: 'R39.75 / 15lbs' },
                { id: 'separate', name: 'Separate Wash', price: 'R79.50 / 30lbs' },
            ],
            description: "We'll separate the lights; you mix wash as light, or the dark loads. You can request 110°F+ washes. Each additional is charged at R2.65 per lb."
        },
        addOns: [
            { id: 'high-temp', name: 'High temperature', description: "Items upgrade to wash at a higher temperature. Check labels before selecting this option." }
        ]
    },
    {
        id: 'dry-cleaning',
        name: 'Dry Cleaning',
        icon: Shirt,
        description: 'From R5.49 / per item',
        details: 'For everyday laundry that requires pressing.',
    },
];

type Service = typeof services[0];
type ServicePreferences = {
    [key: string]: {
        washType?: string;
        highTemp?: boolean;
    }
}

const nextSteps = [
    { icon: Box, text: "Prepare your bags" },
    { icon: Sparkles, text: "We wash & clean" },
    { icon: Truck, text: "We deliver" },
];

export default function ServicesStep() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [servicePreferences, setServicePreferences] = useState<ServicePreferences>({});
    
    // Temporary state for the dialog
    const [tempWashPref, setTempWashPref] = useState<string | undefined>(undefined);
    const [tempHighTemp, setTempHighTemp] = useState<boolean>(false);

    const openServiceDialog = (service: Service) => {
        // Initialize dialog state with existing preferences or defaults
        const currentPrefs = servicePreferences[service.id];
        setTempWashPref(currentPrefs?.washType || service.preferences?.options[0].id);
        setTempHighTemp(currentPrefs?.highTemp || false);
        setEditingService(service);
    };

    const toggleService = (serviceId: string) => {
        const service = services.find(s => s.id === serviceId);
        if (!service) return;

        // If the service has preferences, always open the dialog
        if (service.preferences) {
            openServiceDialog(service);
        } else {
            // For services without preferences, just toggle them in the list
            setSelectedServices(prev =>
                prev.includes(serviceId)
                    ? prev.filter(id => id !== serviceId)
                    : [...prev, serviceId]
            );
        }
    }

    const handleConfirmPreferences = () => {
        if (editingService) {
            // Save the temporary preferences to the main state
            setServicePreferences(prev => ({
                ...prev,
                [editingService.id]: {
                    washType: tempWashPref,
                    highTemp: tempHighTemp,
                }
            }));
            
            // If the service isn't already in the selected list, add it
            if (!selectedServices.includes(editingService.id)) {
                setSelectedServices(prev => [...prev, editingService.id]);
            }

            // Close the dialog
            setEditingService(null);
        }
    }

    return (
         <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">What services do you need?</h2>
                <p className="text-muted-foreground mt-1">Select one or more services for your laundry.</p>
            </div>
            <div className="space-y-4">
                <div className="rounded-lg border">
                    {services.map((service, index) => (
                        <div key={service.id}>
                            <div className="p-4 flex items-start gap-4">
                                <div className="p-3 bg-muted rounded-full">
                                    <service.icon className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                    <p className="text-sm text-muted-foreground">{service.details}</p>
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

             <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <Info className="h-4 w-4 !text-blue-800" />
                <AlertDescription>
                   Do I need to list each item? Not before collection, it is not required. Simply keep your choice of services, then pack and bag your items.
                </AlertDescription>
            </Alert>
        </div>
    )
}
