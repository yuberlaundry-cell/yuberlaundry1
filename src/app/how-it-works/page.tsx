
'use client';

import { useState, useEffect } from 'react';
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Shirt, Wind, ArrowRight, Search as InspectIcon, Waves, Box, Star, Info, Check, Eye, Package, ShieldCheck, BedDouble } from "lucide-react";
import Image from 'next/image';
import { AddressInput } from '@/components/ui/address-input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const services = [
    {
        id: 'wash-fold',
        name: 'Wash & Fold',
        icon: Droplets,
    },
    {
        id: 'dry-cleaning',
        name: 'Dry Cleaning',
        icon: Shirt,
    },
    {
        id: 'duvets-bulky',
        name: 'Duvets & Bulky Items',
        icon: BedDouble,
    },
    {
        id: 'ironing',
        name: 'Ironing',
        icon: Wind,
    }
];

const washAndFoldSteps = [
    {
        icon: InspectIcon,
        title: "We inspect your clothes and check your pockets.",
        description: "We do “pocket inspections” for you so nothing ends up in the wash that shouldn't. All pockets and clothes are inspected before being washed."
    },
    {
        icon: Shirt,
        title: "We clean your items with extra care.",
        description: "Your lights and darks are separated and all your clothes are washed using cold water to preserve color (and save energy)."
    },
    {
        icon: Waves,
        title: "We wash your loads according to your choices.",
        description: "Need hypoallergenic detergent? Want fabric softener? Just select the laundry preferences that are right for you."
    },
    {
        icon: Box,
        title: "We fold everything so that you don't have to.",
        description: "Your clothes are crisply folded, and your socks are paired, ready to be worn or put away when we deliver your clothes to your door!"
    }
];

const dryCleaningSteps = [
    {
        icon: Eye,
        title: "We keep track so that you don’t have to.",
        description: "We email you a photo and itemized inventory of what we pick up, so you remember what’s being cleaned and in what condition."
    },
    {
        icon: InspectIcon,
        title: "We carefully inspect for spots and stains.",
        description: "Our “spotters” have decades of experience in identifying and treating stains in the best way possible so your garments are returned pristine."
    },
    {
        icon: ShieldCheck,
        title: "We clean your clothing with expert care.",
        description: "We follow the care label (and know what all the symbols mean!) so your clothes receive the optimal cleaning treatment and last for years to come."
    },
    {
        icon: Package,
        title: "We press and hang each of your items.",
        description: "Your clothes are crisply pressed, put on hangers, and placed in your protective garment bag, ready to wear when we deliver your dry cleaning to your door!"
    }
]

export default function HowItWorksPage() {
    const [activeTab, setActiveTab] = useState(services[0].id);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && services.some(s => s.id === hash)) {
            setActiveTab(hash);
        }
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="bg-card border-b sticky top-16 z-30">
                        <div className="container mx-auto px-4 sm:px-8 py-4 flex flex-wrap justify-center">
                            <TabsList className="bg-transparent p-0 h-auto gap-2">
                                {services.map(service => (
                                    <TabsTrigger
                                        key={service.id}
                                        value={service.id}
                                        className={cn(
                                            "rounded-full px-4 sm:px-6 py-2 text-sm font-semibold transition-colors",
                                            activeTab === service.id
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        )}
                                    >
                                        <service.icon className="mr-2 h-4 w-4" />
                                        {service.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="wash-fold">
                        <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="prose lg:prose-lg max-w-none">
                                    <h2>Wash & Fold</h2>
                                    <p>Wash & Fold is built for people who don’t waste time on chores that don’t move them forward.</p>
                                    <p>We pick up your laundry, clean it with care using a dedicated machine, and return everything neatly folded – right down to pairing your socks.</p>
                                    <p>Clothes are washed to your preferences and delivered on your schedule, so you can focus on what matters most.</p>
                                    <p>Let us take laundry off your to-do list – permanently.</p>
                                    <Card className="mt-8 bg-transparent shadow-none border-none p-0">
                                        <CardContent className="p-0">
                                            <div className="flex flex-col sm:flex-row gap-4 p-2 border rounded-full">
                                                 <div className="flex-grow grid grid-cols-2">
                                                     <div className="p-2">
                                                        <Label htmlFor="pickup-when">Pickup</Label>
                                                        <p className="font-semibold">Tonight</p>
                                                    </div>
                                                    <div className="p-2 border-l">
                                                        <Label htmlFor="address-input">Where</Label>
                                                        <AddressInput id="address-input" placeholder="Add address" onAddressSelect={() => {}} className="border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" />
                                                    </div>
                                                 </div>
                                                <Button size="icon" className="w-full sm:w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shrink-0">
                                                    <ArrowRight />
                                                    <span className="sr-only">Schedule</span>
                                                </Button>
                                            </div>
                                            <Badge variant="secondary" className="mt-4 bg-green-100 text-green-800 border-green-200">
                                                Your R50 off in credits will be automatically applied
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image
                                        src="https://picsum.photos/seed/folding-board/800/600"
                                        alt="Clothes being folded with a blue folding board"
                                        data-ai-hint="clothes folding board"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <section className="py-16 md:py-24 bg-card">
                            <div className="container mx-auto px-6 sm:px-8">
                                <div className="text-center max-w-3xl mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-bold font-headline">How it works</h2>
                                    <p className="mt-4 text-lg text-muted-foreground">Rinse will pick up your laundry, clean it according to best practices and your preferences, and deliver it back neatly folded—right to your door.</p>
                                </div>
                                <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
                                    {washAndFoldSteps.map((step, index) => (
                                         <div key={index} className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                                                <step.icon className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-semibold">{step.title}</h3>
                                            <p className="mt-2 text-muted-foreground text-sm">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="py-16 md:py-24">
                            <div className="container mx-auto px-6 sm:px-8">
                                <div className="text-center max-w-3xl mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Pricing That Fits Your Needs</h2>
                                    <p className="mt-4 text-lg text-muted-foreground">Two options, one goal: your convenience. Forget about laundry and save up to 55% with Rinse Repeat, or try Rinse with Pay-As-You-Go.</p>
                                     <div className="mt-4 flex items-center justify-center gap-2">
                                        <div className="flex -space-x-2">
                                            <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/p1/32/32" alt="Reviewer 1" width={32} height={32}/>
                                            <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/p2/32/32" alt="Reviewer 2" width={32} height={32}/>
                                            <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/p3/32/32" alt="Reviewer 3" width={32} height={32}/>
                                        </div>
                                        <div className="text-sm text-muted-foreground">from 6,000+ reviews</div>
                                         <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Pay-As-You-Go</CardTitle>
                                            <CardDescription>Occasional, priced per pound</CardDescription>
                                            <div className="pt-4">
                                                <span className="text-4xl font-bold">R99.99</span>
                                                <span className="ml-1 text-muted-foreground">/ Kg</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="font-semibold text-sm">Always</div>
                                            <ul className="space-y-3 text-sm text-muted-foreground">
                                                <li className="flex items-center gap-2">R10.95 Pickup &amp; Delivery Fee</li>
                                                <li className="flex items-center gap-2">3-4 Day Turnaround or R20.95 Next-Day Rush <Info className="h-4 w-4"/></li>
                                                <li className="flex items-center gap-2">R10.00 Service Fee</li>
                                                <li className="flex items-center gap-2">Household items priced separately <Info className="h-4 w-4"/></li>
                                            </ul>
                                             <Button variant="outline" className="w-full">Schedule a pickup</Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-primary border-2">
                                         <Badge className="absolute -top-3 right-4">Most popular</Badge>
                                        <CardHeader>
                                            <CardTitle>Rinse Repeat</CardTitle>
                                            <CardDescription>All-inclusive subscription, priced per bag</CardDescription>
                                            <div className="pt-4">
                                                <span className="text-4xl font-bold">R120.64</span>
                                                <span className="ml-1 text-muted-foreground">/ Kg</span>
                                                <p className="text-xs text-muted-foreground">*As low as</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <ul className="space-y-3 text-sm text-muted-foreground">
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> <span className="line-through">R90.95</span> Free Pickup &amp; Delivery</li>
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> <span className="line-through">R10.95</span> Free Next-Day Rush Service</li>
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> <span className="line-through">R20.00</span> Waived Service Fee</li>
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> If it fits the bag, we'll clean it</li>
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Unlimited rollover of bags and pounds</li>
                                                 <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> R120.00 in monthly credit for other services</li>
                                            </ul>
                                             <Button className="w-full bg-blue-500 hover:bg-blue-600">Explore Rinse Repeat plans</Button>
                                             <Button variant="link" className="w-full p-0 h-auto">Learn about all Rinse Repeat features</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="dry-cleaning">
                        <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="prose lg:prose-lg max-w-none">
                                    <h2>Dry Cleaning</h2>
                                    <p>This is the perfect service for items you want professionally cleaned and returned pressed and on a hanger (this service includes both Dry Cleaning and Launder & Press).</p>
                                    <p>Enjoy premium cleaning from the comfort of your home and never go to the dry cleaners again.</p>
                                </div>
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image
                                        src="https://picsum.photos/seed/dry-cleaning-rack/800/600"
                                        alt="A rack of dry-cleaned clothes"
                                        data-ai-hint="dry cleaning clothes"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                         <section className="py-16 md:py-24 bg-card">
                            <div className="container mx-auto px-6 sm:px-8">
                                <div className="text-center max-w-3xl mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-bold font-headline">How it works</h2>
                                </div>
                                <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
                                    {dryCleaningSteps.map((step, index) => (
                                         <div key={index} className="flex flex-col items-center">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                                                <step.icon className="h-8 w-8" />
                                            </div>
                                            <h3 className="text-xl font-semibold">{step.title}</h3>
                                            <p className="mt-2 text-muted-foreground text-sm">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="duvets-bulky">
                         <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24 text-center">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Duvets & Bulky Items</h2>
                                <p className="text-muted-foreground text-lg">Details for our Duvets & Bulky Items service are coming soon.</p>
                             </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="ironing">
                         <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24 text-center">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ironing</h2>
                                <p className="text-muted-foreground text-lg">Details for our Ironing service are coming soon.</p>
                             </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
            <PublicFooter />
        </div>
    );
}
