
'use client';

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// This data would typically come from a CMS and be fetched on the page.
// We're structuring it here to match what the Superadmin CMS form manages.
const aboutPageContent = {
    hero: {
        headline: "About Yuber Laundry",
        subheadline: "We're on a mission to make laundry day a thing of the past. Life's too short for sorting, washing, and folding."
    },
    story: {
        imageUrlId: "modern-laundromat",
        content: "Founded in 2023, Yuber Laundry was born from a simple idea: laundry is a chore that no one enjoys. We saw an opportunity to use technology to connect people with local, professional laundromats, creating a seamless experience from pickup to delivery. We believe in supporting local businesses while providing a world-class service to our customers."
    },
    values: [
        { title: 'Customer Obsession', description: "We start with the customer and work backwards. We work vigorously to earn and keep customer trust." },
        { title: 'Innovation', description: "We are always looking for new ways to improve our service and make our customers' lives easier." },
        { title: 'Sustainability', description: "We are committed to building a sustainable business that is good for our customers, our partners, and the planet." },
    ],
    team: [
        { name: 'Jane Doe', role: 'CEO & Founder', avatarId: 'team-jane-doe' },
        { name: 'John Smith', role: 'CTO', avatarId: 'team-john-smith' },
        { name: 'Alex Ray', role: 'Head of Operations', avatarId: 'team-alex-ray' },
        { name: 'Maria Garcia', role: 'Partner Success Lead', avatarId: 'team-maria-garcia' },
    ]
};


export default function AboutPage() {
    const storyImage = PlaceHolderImages.find(p => p.id === aboutPageContent.story.imageUrlId);
    
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow">
                <section className="bg-primary text-primary-foreground py-20 md:py-32">
                    <div className="container mx-auto px-6 sm:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">{aboutPageContent.hero.headline}</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
                            {aboutPageContent.hero.subheadline}
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 sm:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square">
                                {storyImage && (
                                    <Image
                                        src={storyImage.imageUrl}
                                        alt={storyImage.description}
                                        data-ai-hint={storyImage.imageHint}
                                        fill
                                        className="object-cover rounded-2xl"
                                    />
                                )}
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Story</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {aboutPageContent.story.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-card">
                    <div className="container mx-auto px-6 sm:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Values</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                The principles that guide every decision we make.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {aboutPageContent.values.map(value => (
                                <Card key={value.title} className="text-center">
                                    <CardContent className="p-8">
                                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 sm:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet the Team</h2>
                        </div>
                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {aboutPageContent.team.map(member => {
                                const memberImage = PlaceHolderImages.find(p => p.id === member.avatarId);
                                return (
                                    <div key={member.name} className="text-center">
                                        <Avatar className="h-24 w-24 mx-auto">
                                            {memberImage && (
                                                <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />
                                            )}
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                                        <p className="text-muted-foreground">{member.role}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <PublicFooter />
        </div>
    );
}
