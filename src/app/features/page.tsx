

'use client';

import { useState, useEffect } from 'react';
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Sparkles, Gift, Users, ShoppingBag, Truck, Zap, Circle, Info, Check } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type Plan, initialPlans } from '@/lib/plans';


const featureTabs = [
    {
        id: 'yuber-repeat',
        name: 'Yuber Repeat',
        icon: Sparkles,
    },
    {
        id: 'gift-cards',
        name: 'Gift Cards',
        icon: Gift,
    },
    {
        id: 'referrals',
        name: 'Referral Program',
        icon: Users,
    }
];

const repeatFeatures = [
    { icon: Truck, text: 'Free Pickup & Delivery' },
    { icon: Zap, text: 'Free Next-Day Rush Service' },
    { icon: Circle, text: 'Waived Service Fee' },
    { icon: Info, text: 'Unlimited rollover of bags' },
    { icon: Gift, text: 'R120 monthly credit for other services' }
];

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState(featureTabs[0].id);
    const [isAnnual, setIsAnnual] = useState(false);

    // Filter for consumer plans that are part of Yuber Repeat
    const repeatPlans = initialPlans.filter(p => p.type === 'Consumer' && p.name.includes('Yuber Repeat'));

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && featureTabs.some(s => s.id === hash)) {
            setActiveTab(hash);
        }
    }, []);

    const getBagIcon = (bags: number = 1) => {
        if (bags >= 4) return Users;
        if (bags > 1) return Users;
        return ShoppingBag;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="bg-card border-b sticky top-16 z-30">
                        <div className="container mx-auto px-4 sm:px-8 py-4">
                            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                                <TabsList className="bg-transparent p-0 h-auto gap-2">
                                    {featureTabs.map(tab => (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            className={cn(
                                                "rounded-full px-4 sm:px-6 py-2 text-sm font-semibold transition-colors",
                                                "data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 hover:bg-gray-200",
                                                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                                            )}
                                            onClick={() => window.history.pushState(null, '', `#${tab.id}`)}
                                        >
                                            <tab.icon className="mr-2 h-4 w-4" />
                                            {tab.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <ScrollBar orientation="horizontal" className="invisible" />
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                        <TabsContent value="yuber-repeat">
                             <section className="text-center">
                                <Image src="https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=1200&h=400&fit=crop" width={1200} height={400} alt="Yuber Repeat Bag" className="w-full h-48 md:h-64 object-cover rounded-2xl mb-8" data-ai-hint="folded towels"/>
                                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Returned fresh and ready to wear.</h1>
                                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Your clothes get their own machine, are separated by lights and darks, cleaned according to your preferences, and delivered neatly folded to your door - we even pair your socks.</p>
                            </section>

                            <section className="mt-16 md:mt-24">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-6">
                                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Choose your perfect plan</h2>
                                        <p className="text-muted-foreground">If it fits in the bag, we take care of it. All Yuber Repeat plans include:</p>
                                        <ul className="space-y-4">
                                            {repeatFeatures.map(feature => (
                                                <li key={feature.text} className="flex items-center gap-3">
                                                    <feature.icon className="h-5 w-5 text-primary" />
                                                    <span className="font-medium">{feature.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                                            <Switch id="annual-billing" checked={isAnnual} onCheckedChange={setIsAnnual}/>
                                            <Label htmlFor="annual-billing" className="font-medium">Save additional 15% with annual billing</Label>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Change, pause, or cancel your Yuber Repeat plan anytime.</p>
                                    </div>
                                    <div className="space-y-4">
                                        {repeatPlans.map(plan => {
                                            const finalPrice = isAnnual ? parseFloat(plan.price) * 12 * 0.85 / 12 : parseFloat(plan.price);
                                            const pricePerBag = finalPrice / (plan.limits.bagsIncluded || 1);
                                            const BagIcon = getBagIcon(plan.limits.bagsIncluded);

                                            return (
                                                <Card key={plan.name} className={cn("transition-all", plan.popular ? "border-2 border-primary shadow-lg" : "")}>
                                                    {plan.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
                                                    <CardContent className="p-4 grid grid-cols-3 items-center">
                                                        <div className="flex items-center gap-3 col-span-2">
                                                            <div className={cn("p-2 rounded-lg", plan.popular ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                                                                <BagIcon className="h-6 w-6"/>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{plan.name.replace('Yuber Repeat ', '')}</p>
                                                                <p className="text-sm text-muted-foreground">{plan.features.join(', ')}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-xl md:text-2xl">R{pricePerBag.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/bag</span></p>
                                                            <p className="text-xs text-muted-foreground">R{finalPrice.toFixed(2)}/month</p>
                                                        </div>
                                                         <div className="col-span-3 mt-2">
                                                            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>Choose this plan</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            </section>
                        </TabsContent>
                         <TabsContent value="gift-cards">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Gift Cards</h2>
                                <p className="text-muted-foreground text-lg">Purchase and redeem gift cards for Yuber Laundry.</p>
                            </div>
                        </TabsContent>
                         <TabsContent value="referrals">
                             <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Referral Program</h2>
                                <p className="text-muted-foreground text-lg">Learn how to earn rewards by referring friends.</p>
                             </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
            <PublicFooter />
        </div>
    );
}
