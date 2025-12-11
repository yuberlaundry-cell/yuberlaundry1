
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function HomepageContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Homepage content saved!",
            description: "Your changes have been successfully saved and are now live.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Homepage Content</h1>
                <p className="text-muted-foreground">
                    Manage the content displayed on the main marketing homepage.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>The first thing visitors see on your website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hero-headline">Headline</Label>
                        <Textarea id="hero-headline" defaultValue="Change the way you laundry" className="text-2xl font-bold font-headline" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hero-subheadline">Sub-headline</Label>
                        <Textarea id="hero-subheadline" defaultValue="Home or away, work or weekend - move freely between laundromats and dry cleaners. Schedule pickup for free, in a tap." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-image">Hero Image URL</Label>
                        <Input id="hero-image" defaultValue="https://images.unsplash.com/photo-1593121184920-951e4445a435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzbWlsaW5nJTIwYmxhY2slMjB3b21hbiUyMGhvbGRpbmclMjBsYXVuZHJ5JTIwYmFnfGVufDB8fHx8MTc2NTU2MTM5OXww&ixlib=rb-4.1.0&q=80&w=1080" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Value Proposition</CardTitle>
                     <CardDescription>The section below the hero explaining your main value.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="value-prop-headline">Headline</Label>
                        <Input id="value-prop-headline" defaultValue="Your laundry, reimagined" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="value-prop-subheadline">Sub-headline</Label>
                        <Textarea id="value-prop-subheadline" defaultValue="Schedule quickly, clean professionally, deliver reliably — all with Yuber Laundry." />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Feature Cards</CardTitle>
                     <CardDescription>Manage the three feature cards below the value proposition.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Feature 1 */}
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Card 1: Schedule</h4>
                         <div className="space-y-2">
                            <Label htmlFor="feature1-super">Super Text</Label>
                            <Input id="feature1-super" defaultValue="60 sec" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feature1-badge">Badge Text</Label>
                            <Input id="feature1-badge" defaultValue="Pickup scheduled" />
                        </div>
                    </div>
                     {/* Feature 2 */}
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Card 2: Professional</h4>
                         <div className="space-y-2">
                            <Label htmlFor="feature2-super">Super Text</Label>
                            <Input id="feature2-super" defaultValue="Expert care" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feature2-badge">Badge Text</Label>
                            <Input id="feature2-badge" defaultValue="Dry cleaning" />
                        </div>
                    </div>
                     {/* Feature 3 */}
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Card 3: Delivery</h4>
                         <div className="space-y-2">
                            <Label htmlFor="feature3-super">Super Text</Label>
                            <Input id="feature3-super" defaultValue="24 hours" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feature3-badge">Badge Text</Label>
                            <Input id="feature3-badge" defaultValue="Delivered" />
                        </div>
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button type="submit">Save Homepage Content</Button>
            </div>
        </form>
    );
}
