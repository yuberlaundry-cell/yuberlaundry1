
'use client';

import { useState } from 'react';
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Shirt, Wind } from "lucide-react";
import Image from 'next/image';
import { AddressInput } from '@/components/ui/address-input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const services = [
    {
        id: 'wash-fold',
        name: 'Wash & Fold',
        icon: Droplets,
        description: "Wash & Fold is built for people who don't waste time on chores that don't move them forward. We pick up your laundry, clean it with care using a dedicated machine, and return everything neatly folded – right down to pairing your socks. Clothes are washed to your preferences and delivered on your schedule, so you can focus on what matters most. Let us take laundry off your to-do list – permanently.",
        image: "https://picsum.photos/seed/laundry-folding/800/600",
        imageHint: "folding clothes"
    },
    {
        id: 'dry-cleaning',
        name: 'Dry Cleaning',
        icon: Shirt,
        description: "Our professional dry cleaning service is perfect for your delicate items, suits, dresses, and more. We use state-of-the-art equipment and eco-friendly solvents to ensure your clothes are returned in pristine condition, looking sharp and feeling fresh.",
        image: "https://picsum.photos/seed/dry-cleaning/800/600",
        imageHint: "clothes on rack"
    },
    {
        id: 'hang-dry',
        name: 'Hang Dry',
        icon: Wind,
        description: "For items that are too delicate for the dryer, our Hang Dry option provides a gentle alternative. We'll carefully hang your clothes to dry, preserving their shape and fabric integrity. It's the perfect choice for activewear, lingerie, and other sensitive garments.",
        image: "https://picsum.photos/seed/hang-dry/800/600",
        imageHint: "clothes on line"
    },
    {
        id: 'ironing',
        name: 'Ironing',
        icon: Shirt,
        description: "Need that crisp, professional look? Add our ironing service to your order. Our experts will press everything to perfection, from business shirts to bed linens, so you're always looking your best without the hassle.",
        image: "https://picsum.photos/seed/ironing/800/600",
        imageHint: "ironing board"
    }
];

export default function HowItWorksPage() {
    const [activeTab, setActiveTab] = useState(services[0].id);

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b">
                        <div className="container mx-auto px-6 sm:px-8">
                             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto -mb-px bg-transparent p-0">
                                {services.map(service => (
                                    <TabsTrigger key={service.id} value={service.id} className="text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14">
                                        <service.icon className="mr-2" />
                                        {service.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>
                    {services.map(service => (
                         <TabsContent key={service.id} value={service.id}>
                            <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className="prose lg:prose-lg max-w-none">
                                        <h2>{service.name}</h2>
                                        <p>{service.description}</p>
                                        <Card className="mt-8">
                                            <CardContent className="p-4">
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                     <div className="flex-grow">
                                                        <Label htmlFor="address-input">Where</Label>
                                                        <AddressInput id="address-input" placeholder="Add address" onAddressSelect={() => {}} />
                                                    </div>
                                                    <div className="sm:w-auto">
                                                        <Label>Pickup</Label>
                                                        <Button variant="outline" className="w-full">Tonight</Button>
                                                    </div>
                                                    <div className="flex items-end">
                                                        <Button size="icon" className="w-full sm:w-10">
                                                            <span className="sr-only">Schedule</span>
                                                            &rarr;
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="mt-4 bg-green-100 text-green-800">
                                                    Your $20 off in credits will be automatically applied
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.name}
                                            data-ai-hint={service.imageHint}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                         </TabsContent>
                    ))}
                </Tabs>
            </main>
            <PublicFooter />
        </div>
    );
}
