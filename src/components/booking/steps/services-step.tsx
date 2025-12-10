
'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Shirt, Snowflake, Zap, Wind, ShoppingBag, VenetianMask } from "lucide-react";
import { useState, useMemo } from "react";

const services = [
    { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag, description: "Per lb, standard service", price: 25.00, priceText: "Est. $25.00" },
    { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask, description: "Per item, for delicates", price: 15.00, priceText: "Est. $15.00" },
    { id: 'ironing', name: 'Ironing', icon: Shirt, description: "Per item, crisp finish", price: 5.00, priceText: "Est. $5.00" },
];

const preferences = {
    'wash-fold': [
        { id: 'detergent', label: 'Detergent', type: 'select', options: ['Standard', 'Hypoallergenic', 'Eco-friendly'] },
        { id: 'water-temp', label: 'Water Temperature', type: 'select', options: ['Cold', 'Warm', 'Hot'], icon: Snowflake },
        { id: 'dryer-temp', label: 'Dryer Preference', type: 'select', options: ['Tumble Dry Low', 'Tumble Dry High', 'Air Dry'], icon: Wind },
    ],
    'dry-cleaning': [
        { id: 'fragile', label: 'Fragile Items', description: 'Handle with extra care', type: 'switch', icon: Zap }
    ]
}


export default function ServicesStep() {
    const [selectedServices, setSelectedServices] = useState<string[]>(['wash-fold', 'dry-cleaning']);

    const handleServiceToggle = (serviceId: string) => {
        setSelectedServices(prev => 
            prev.includes(serviceId) 
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    }

    const estimatedTotal = useMemo(() => {
        return services.reduce((total, service) => {
            if (selectedServices.includes(service.id)) {
                return total + service.price;
            }
            return total;
        }, 0);
    }, [selectedServices]);


    return (
         <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Select Services</h2>
                <p className="text-muted-foreground mt-1">Choose what you'd like us to take care of.</p>
            </div>
            <div className="space-y-4">
                {services.map(service => (
                    <Card key={service.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Checkbox id={service.id} checked={selectedServices.includes(service.id)} onCheckedChange={() => handleServiceToggle(service.id)} />
                                <Label htmlFor={service.id} className="flex items-center gap-3 cursor-pointer">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{service.name}</p>
                                        <p className="text-sm text-muted-foreground">{service.description}</p>
                                    </div>
                                </Label>
                            </div>
                            <p className="font-semibold text-sm">{service.priceText}</p>
                        </div>
                        {/* @ts-ignore */}
                        {preferences[service.id] && selectedServices.includes(service.id) && (
                            <div className="mt-4 pl-16 space-y-4">
                                    {/* @ts-ignore */}
                                {preferences[service.id].map(pref => (
                                    <div key={pref.id} className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            {pref.icon && <pref.icon className="h-4 w-4 text-muted-foreground" />}
                                            <span>{pref.label}</span>
                                        </Label>
                                        {pref.type === 'select' && (
                                            <Select defaultValue={pref.options[0]}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {pref.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        {pref.type === 'switch' && (
                                            <div className="flex items-center space-x-2">
                                                <Switch id={pref.id} />
                                                <Label htmlFor={pref.id} className="text-sm text-muted-foreground">{pref.description}</Label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}
