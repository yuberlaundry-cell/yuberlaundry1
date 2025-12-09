'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Shirt, Snowflake, Zap, Sun, Wind, ShoppingBag, VenetianMask } from "lucide-react";

const services = [
    { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag, description: "Per lb, standard service" },
    { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask, description: "Per item, for delicates" },
    { id: 'ironing', name: 'Ironing', icon: Shirt, description: "Per item, crisp finish" },
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


export default function ServicesPage() {

    return (
        <BookingLayout
            stepTitle="Select Services"
            stepDescription="Choose what you'd like us to take care of."
            nextHref="/app/book/instructions"
            backHref="/app/book/schedule"
        >
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {services.map(service => (
                        <Card key={service.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Checkbox id={service.id} />
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
                                <p className="font-semibold text-sm">From $1.75/lb</p>
                            </div>
                            {/* @ts-ignore */}
                            {preferences[service.id] && (
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
                <div className="md:col-span-1">
                    <Card className="p-4 sticky top-24">
                        <h3 className="font-semibold mb-4">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Wash & Fold</p>
                                <p>Est. $25.00</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Dry Cleaning</p>
                                <p>Est. $15.00</p>
                            </div>
                             <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
                                <p>Estimated Total</p>
                                <p>$40.00</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </BookingLayout>
    )
}
