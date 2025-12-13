
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const howItWorksSteps = [
    { id: '1', title: 'We inspect your clothes and check your pockets.' },
    { id: '2', title: 'We clean your items with extra care.' },
    { id: '3', title: 'We wash your loads according to your choices.' },
    { id: '4', title: 'We fold everything so that you don\'t have to.' }
];
const dryCleaningStepsCms = [
    { id: '1', title: 'We keep track so that you don’t have to.' },
    { id: '2', title: 'We carefully inspect for spots and stains.' },
    { id: '3', title: 'We clean your clothing with expert care.' },
    { id: '4', title: 'We press and hang each of your items.' },
];

export default function HowItWorksContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "How It Works content saved!",
            description: "Your changes have been successfully saved and are now live.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">How It Works Page Content</h1>
                <p className="text-muted-foreground">
                    Manage the content displayed on the various "How It Works" tabs.
                </p>
            </div>

            <Tabs defaultValue="wash-fold">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="wash-fold">Wash & Fold</TabsTrigger>
                    <TabsTrigger value="dry-cleaning">Dry Cleaning</TabsTrigger>
                    <TabsTrigger value="duvets-bulky">Duvets & Bulky</TabsTrigger>
                    <TabsTrigger value="ironing">Ironing</TabsTrigger>
                </TabsList>
                <TabsContent value="wash-fold">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wash & Fold Page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label>Main Content</Label>
                                <Textarea defaultValue="Wash & Fold is built for people who don’t waste time on chores that don’t move them forward. We pick up your laundry, clean it with care using a dedicated machine, and return everything neatly folded – right down to pairing your socks. Clothes are washed to your preferences and delivered on your schedule, so you can focus on what matters most. Let us take laundry off your to-do list – permanently." rows={6}/>
                            </div>
                            <div className="space-y-4 rounded-lg border p-4">
                                <h4 className="font-semibold">"How it works" Section Steps</h4>
                                {howItWorksSteps.map((step, index) => (
                                    <div key={step.id} className="space-y-4 p-4 border rounded-md">
                                        <div className="space-y-2">
                                            <Label htmlFor={`wf-step-${index}-title`}>Step {index + 1} Title</Label>
                                            <Input id={`wf-step-${index}-title`} defaultValue={step.title} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`wf-step-${index}-desc`}>Step {index + 1} Description</Label>
                                            <Textarea id={`wf-step-${index}-desc`} defaultValue="Default description text for this step." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`wf-step-${index}-video`}>Step {index + 1} Video URL (optional)</Label>
                                            <Input id={`wf-step-${index}-video`} placeholder="e.g., https://youtube.com/watch?v=..."/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="dry-cleaning">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dry Cleaning Page</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label>Main Content</Label>
                                <Textarea defaultValue="This is the perfect service for items you want professionally cleaned and returned pressed and on a hanger (this service includes both Dry Cleaning and Launder & Press). Enjoy premium cleaning from the comfort of your home and never go to the dry cleaners again." rows={4}/>
                            </div>
                             <div className="space-y-4 rounded-lg border p-4">
                                <h4 className="font-semibold">"How it works" Section Steps</h4>
                                {dryCleaningStepsCms.map((step, index) => (
                                    <div key={step.id} className="space-y-4 p-4 border rounded-md">
                                        <div className="space-y-2">
                                            <Label htmlFor={`dc-step-${index}-title`}>Step {index + 1} Title</Label>
                                            <Input id={`dc-step-${index}-title`} defaultValue={step.title} />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor={`dc-step-${index}-desc`}>Step {index + 1} Description</Label>
                                            <Textarea id={`dc-step-${index}-desc`} defaultValue="Default description text for this step." />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor={`dc-step-${index}-video`}>Step {index + 1} Video URL (optional)</Label>
                                            <Input id={`dc-step-${index}-video`} placeholder="e.g., https://youtube.com/watch?v=..."/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="duvets-bulky">
                    <Card>
                        <CardHeader><CardTitle>Duvets & Bulky Items Page</CardTitle></CardHeader>
                        <CardContent><Textarea defaultValue="Details for our Duvets & Bulky Items service are coming soon." /></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ironing">
                    <Card>
                        <CardHeader><CardTitle>Ironing Page</CardTitle></CardHeader>
                        <CardContent><Textarea defaultValue="Details for our Ironing service are coming soon." /></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <div className="flex justify-end pt-4">
                <Button type="submit">Save All Changes</Button>
            </div>
        </form>
    );
}
