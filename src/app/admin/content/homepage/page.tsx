
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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
                        <Input id="hero-image" defaultValue="https://images.unsplash.com/photo-1582735689365-27f72f895995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsYXVuZHJ5JTIwYmFnfGVufDB8fHx8MTc2NTI4MTQyNXww&ixlib=rb-4.1.0&q=80&w=1080" />
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

             <div className="flex justify-end">
                <Button type="submit">Save Homepage Content</Button>
            </div>
        </form>
    );
}
