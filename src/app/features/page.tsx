
'use client';

import { useState, useEffect } from 'react';
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Sparkles, Gift, Users } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const featureTabs = [
    {
        id: 'yuber-plus',
        name: 'Yuber Plus',
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

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState(featureTabs[0].id);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && featureTabs.some(s => s.id === hash)) {
            setActiveTab(hash);
        }
    }, []);

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
                    <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24 text-center">
                        <div className="max-w-3xl mx-auto">
                            <TabsContent value="yuber-plus">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Yuber Plus</h2>
                                <p className="text-muted-foreground text-lg">Information about the Yuber Plus subscription program.</p>
                            </TabsContent>
                             <TabsContent value="gift-cards">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Gift Cards</h2>
                                <p className="text-muted-foreground text-lg">Purchase and redeem gift cards for Yuber Laundry.</p>
                            </TabsContent>
                             <TabsContent value="referrals">
                                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Referral Program</h2>
                                <p className="text-muted-foreground text-lg">Learn how to earn rewards by referring friends.</p>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </main>
            <PublicFooter />
        </div>
    );
}
