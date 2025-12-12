
'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Box, Sparkles, Truck, Shirt, Waves, Droplets, Wind, BedDouble, Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const servicesConfig = [
    {
        id: 'wash-fold',
        name: 'Wash & Fold',
        icon: Droplets,
        details: 'For everyday laundry, bedsheets and towels.',
        description: 'From R40.00 / per kg',
        preferences: {
            title: 'Wash & Fold Preferences',
            wash_types: [
                { id: 'mixed', name: 'Mixed Wash', price_multiplier: 1 },
                { id: 'separate', name: 'Separate Wash', price_multiplier: 2, description: "We'll separate lights and darks." },
            ],
            temperatures: ['Cold', 'Warm', 'Hot'],
        },
        addOns: [
            { id: 'high-temp', name: 'High temperature wash', description: "Items will be washed at a higher temperature. Please check labels before selecting." }
        ]
    },
    {
        id: 'dry-cleaning',
        name: 'Dry Cleaning',
        icon: Shirt,
        details: 'For delicate items that require special care.',
        description: 'From R80.00 / per item',
    },
    {
        id: 'ironing',
        name: 'Ironing',
        icon: Wind,
        details: 'Get your clothes professionally pressed.',
        description: 'From R25.00 / per item',
    },
     {
        id: 'duvets-bulky',
        name: 'Duvets & Bulky Items',
        icon: BedDouble,
        details: 'For large items like duvets and comforters.',
        description: 'From R150.00 / per item',
    }
];

type Service = typeof servicesConfig[0];
type ServicePreferences = {
    [key: string]: {
        washType?: string;
        temperature?: string;
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
    const [tempTempPref, setTempTempPref] = useState<string | undefined>(undefined);

    const openServiceDialog = (service: Service) => {
        // Initialize dialog state with existing preferences or defaults
        const currentPrefs = servicePreferences[service.id];
        setTempWashPref(currentPrefs?.washType || service.preferences?.wash_types[0].id);
        setTempTempPref(currentPrefs?.temperature || service.preferences?.temperatures[0]);
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
                    temperature: tempTempPref,
                }
            }));
            
            if (!selectedServices.includes(editingService.id)) {
                setSelectedServices(prev => [...prev, editingService.id]);
            }

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
                    {servicesConfig.map((service, index) => (
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
                            {index < servicesConfig.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!editingService} onOpenChange={(isOpen) => !isOpen && setEditingService(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingService?.preferences?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                        {editingService?.preferences?.wash_types && (
                            <RadioGroup
                                value={tempWashPref}
                                onValueChange={setTempWashPref}
                                className="space-y-3"
                            >
                                <Label className="font-semibold">Wash Type</Label>
                                {editingService.preferences.wash_types.map(opt => (
                                    <Label key={opt.id} htmlFor={opt.id} className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                        <RadioGroupItem value={opt.id} id={opt.id} className="mt-1"/>
                                        <div>
                                            <p className="font-medium">{opt.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Base Price x{opt.price_multiplier}
                                                {opt.description && ` - ${opt.description}`}
                                            </p>
                                        </div>
                                    </Label>
                                ))}
                            </RadioGroup>
                        )}
                       
                        {editingService?.preferences?.temperatures && (
                             <div className="space-y-3">
                                 <Label htmlFor="temp-select" className="font-semibold">Temperature</Label>
                                <Select value={tempTempPref} onValueChange={setTempTempPref}>
                                    <SelectTrigger id="temp-select">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {editingService.preferences.temperatures.map(temp => (
                                             <SelectItem key={temp} value={temp}>{temp}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                             </div>
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
