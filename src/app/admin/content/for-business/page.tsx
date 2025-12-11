
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function ForBusinessContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "For Business page content saved!",
            description: "Your changes have been successfully saved and are now live.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">For Business Page Content</h1>
                <p className="text-muted-foreground">
                    Manage the content displayed on the "For Business" marketing page.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>The first thing visitors see on the page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hero-headline">Headline</Label>
                        <Textarea id="hero-headline" defaultValue="The employee benefit that actually gives time back." className="text-2xl font-bold font-headline" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hero-subheadline">Sub-headline</Label>
                        <Textarea id="hero-subheadline" defaultValue="Empower your team with the ultimate convenience. Yuber for Business simplifies laundry so your employees can focus on what matters most." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-image">Hero Image URL</Label>
                        <Input id="hero-image" defaultValue="https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBvZmZpY2V8ZW58MHx8fHwxNzY1MjgxNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080" />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Industry Solutions</CardTitle>
                     <CardDescription>Manage the cards for different industry solutions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Industry Card 1: Corporates</h4>
                         <div className="space-y-2">
                            <Label htmlFor="industry1-desc">Description</Label>
                            <Input id="industry1-desc" defaultValue="Offer a modern wellness perk to your office-based or remote employees." />
                        </div>
                    </div>
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Industry Card 2: Hotels</h4>
                         <div className="space-y-2">
                            <Label htmlFor="industry2-desc">Description</Label>
                            <Input id="industry2-desc" defaultValue="Outsource guest laundry and staff uniform cleaning with reliable turnaround." />
                        </div>
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button type="submit">Save Page Content</Button>
            </div>
        </form>
    );
}
