
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2, PlusCircle } from 'lucide-react';

const initialContent = {
    heroHeadline: "About Yuber Laundry",
    heroSubheadline: "We're on a mission to make laundry day a thing of the past. Life's too short for sorting, washing, and folding.",
    storyImageUrl: "https://images.unsplash.com/photo-1545172288-1f48b9193557?w=800&h=800&fit=crop",
    storyContent: "Founded in 2023, Yuber Laundry was born from a simple idea: laundry is a chore that no one enjoys. We saw an opportunity to use technology to connect people with local, professional laundromats, creating a seamless experience from pickup to delivery. We believe in supporting local businesses while providing a world-class service to our customers.",
    values: [
        { id: 'v1', title: 'Customer Obsession', description: "We start with the customer and work backwards. We work vigorously to earn and keep customer trust." },
        { id: 'v2', title: 'Innovation', description: "We are always looking for new ways to improve our service and make our customers' lives easier." },
        { id: 'v3', title: 'Sustainability', description: "We are committed to building a sustainable business that is good for our customers, our partners, and the planet." },
    ],
    team: [
        { id: 't1', name: 'Jane Doe', role: 'CEO & Founder', avatarUrl: 'https://picsum.photos/seed/team1/100/100' },
        { id: 't2', name: 'John Smith', role: 'CTO', avatarUrl: 'https://picsum.photos/seed/team2/100/100' },
        { id: 't3', name: 'Alex Ray', role: 'Head of Operations', avatarUrl: 'https://picsum.photos/seed/team3/100/100' },
        { id: 't4', name: 'Maria Garcia', role: 'Partner Success Lead', avatarUrl: 'https://picsum.photos/seed/team4/100/100' },
    ]
}


export default function AboutContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "About page content saved!",
            description: "Your changes have been successfully saved and are now live.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">About Page Content</h1>
                <p className="text-muted-foreground">
                    Manage the content displayed on the "About Us" marketing page.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hero-headline">Headline</Label>
                        <Input id="hero-headline" defaultValue={initialContent.heroHeadline} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hero-subheadline">Sub-headline</Label>
                        <Textarea id="hero-subheadline" defaultValue={initialContent.heroSubheadline} />
                    </div>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle>Our Story Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="story-image">Image URL</Label>
                        <Input id="story-image" defaultValue={initialContent.storyImageUrl} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="story-content">Story Content</Label>
                        <Textarea id="story-content" defaultValue={initialContent.storyContent} rows={5} />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Our Values Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {initialContent.values.map(item => (
                        <div key={item.id} className="space-y-3 rounded-lg border p-4">
                            <div className="flex justify-end">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`value-title-${item.id}`}>Value Title</Label>
                                <Input id={`value-title-${item.id}`} defaultValue={item.title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`value-desc-${item.id}`}>Description</Label>
                                <Textarea id={`value-desc-${item.id}`} defaultValue={item.description} />
                            </div>
                        </div>
                    ))}
                     <Button variant="outline" className="w-full mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Add Value</Button>
                </CardContent>
            </Card>

             <Card>
                 <CardHeader>
                    <CardTitle>Team Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {initialContent.team.map(member => (
                        <div key={member.id} className="space-y-3 rounded-lg border p-4">
                            <div className="flex justify-end">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`team-name-${member.id}`}>Name</Label>
                                    <Input id={`team-name-${member.id}`} defaultValue={member.name} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor={`team-role-${member.id}`}>Role</Label>
                                    <Input id={`team-role-${member.id}`} defaultValue={member.role} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`team-avatar-${member.id}`}>Avatar Image URL</Label>
                                <Input id={`team-avatar-${member.id}`} defaultValue={member.avatarUrl} />
                            </div>
                        </div>
                    ))}
                     <Button variant="outline" className="w-full mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Add Team Member</Button>
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button type="submit">Save Page Content</Button>
            </div>
        </form>
    );
}
