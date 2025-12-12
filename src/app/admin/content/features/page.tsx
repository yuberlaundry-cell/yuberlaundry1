
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FeaturesContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent, page: string) => {
        e.preventDefault();
        toast({
            title: `${page} content saved!`,
            description: "Your changes have been successfully saved and are now live.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'Features')}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Features Pages Content</h1>
                <p className="text-muted-foreground">
                    Manage the content displayed on the various Features pages.
                </p>
            </div>

            <Tabs defaultValue="yuber-plus">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="yuber-plus">Yuber Plus</TabsTrigger>
                    <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
                    <TabsTrigger value="referrals">Referral Program</TabsTrigger>
                </TabsList>
                <TabsContent value="yuber-plus">
                    <Card>
                        <CardHeader>
                            <CardTitle>Yuber Plus Page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="plus-headline">Headline</Label>
                                <Textarea id="plus-headline" defaultValue="Yuber Plus" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="plus-desc">Description</Label>
                                <Textarea id="plus-desc" defaultValue="Information about the Yuber Plus subscription program." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="gift-cards">
                     <Card>
                        <CardHeader>
                            <CardTitle>Gift Cards Page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gift-headline">Headline</Label>
                                <Textarea id="gift-headline" defaultValue="Gift Cards" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="gift-desc">Description</Label>
                                <Textarea id="gift-desc" defaultValue="Purchase and redeem gift cards for Yuber Laundry." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="referrals">
                     <Card>
                        <CardHeader>
                            <CardTitle>Referral Program Page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="referral-headline">Headline</Label>
                                <Textarea id="referral-headline" defaultValue="Referral Program" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="referral-desc">Description</Label>
                                <Textarea id="referral-desc" defaultValue="Learn how to earn rewards by referring friends." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <div className="flex justify-end pt-4">
                <Button type="submit">Save All Changes</Button>
            </div>
        </form>
    );
}
