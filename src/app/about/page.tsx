
'use client';

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
    { name: 'Jane Doe', role: 'CEO & Founder', avatar: 'https://picsum.photos/seed/team1/100/100', aiHint: 'woman ceo' },
    { name: 'John Smith', role: 'CTO', avatar: 'https://picsum.photos/seed/team2/100/100', aiHint: 'man developer' },
    { name: 'Alex Ray', role: 'Head of Operations', avatar: 'https://picsum.photos/seed/team3/100/100', aiHint: 'man operations' },
    { name: 'Maria Garcia', role: 'Partner Success Lead', avatar: 'https://picsum.photos/seed/team4/100/100', aiHint: 'woman success' },
];

const values = [
    { title: 'Customer Obsession', description: "We start with the customer and work backwards. We work vigorously to earn and keep customer trust." },
    { title: 'Innovation', description: "We are always looking for new ways to improve our service and make our customers' lives easier." },
    { title: 'Sustainability', description: "We are committed to building a sustainable business that is good for our customers, our partners, and the planet." },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow">
                <section className="bg-primary text-primary-foreground py-20 md:py-32">
                    <div className="container mx-auto px-6 sm:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">About Yuber Laundry</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
                            We're on a mission to make laundry day a thing of the past. Life's too short for sorting, washing, and folding.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 sm:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-square">
                                <Image
                                    src="https://images.unsplash.com/photo-1545172288-1f48b9193557?w=800&h=800&fit=crop"
                                    alt="A modern laundromat facility"
                                    data-ai-hint="modern laundromat"
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Story</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    Founded in 2023, Yuber Laundry was born from a simple idea: laundry is a chore that no one enjoys. We saw an opportunity to use technology to connect people with local, professional laundromats, creating a seamless experience from pickup to delivery. We believe in supporting local businesses while providing a world-class service to our customers.
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
                            {values.map(value => (
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
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center">
                                    <Avatar className="h-24 w-24 mx-auto">
                                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.aiHint} />
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                                    <p className="text-muted-foreground">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <PublicFooter />
        </div>
    );
}
