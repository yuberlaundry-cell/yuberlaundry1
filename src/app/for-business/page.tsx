import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Zap, Users, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
    {
        icon: Zap,
        title: "Boost Productivity",
        description: "Give your employees back their time. Less time on chores means more focus at work."
    },
    {
        icon: Users,
        title: "Attract & Retain Talent",
        description: "Offer a competitive perk that modern employees value. Stand out as a top employer."
    },
    {
        icon: CheckCircle,
        title: "Simple to Manage",
        description: "Our business portal makes it easy to manage employees, set allowances, and track usage."
    },
    {
        icon: BarChart,
        title: "Controlled Budgets",
        description: "Set flexible spending limits per employee or department. No surprise costs."
    }
]

export default function ForBusinessPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'business-hero');
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full py-20 md:py-32 flex items-center justify-center text-center text-white">
                    {heroImage && (
                        <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        fill
                        className="object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-primary/80" />
                    <div className="relative z-10 p-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
                            Elevate Your Employee Perks
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90">
                            Offer the ultimate convenience with Yuber Laundry for Business. A simple, powerful benefit for your team.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <a href="#contact">Request a Demo</a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-12 sm:py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">A Perk They'll Actually Use</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Discover the advantages of offering laundry services to your team.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {benefits.map(benefit => (
                                <div key={benefit.title} className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-primary/10 text-primary rounded-full p-3">
                                            <benefit.icon className="h-6 w-6"/>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section id="contact" className="py-12 sm:py-16 md:py-24 bg-card">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                             <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Get Started?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Fill out the form to get in touch with our sales team. We'll walk you through the platform and create a custom plan for your business.
                            </p>
                        </div>
                         <Card>
                            <CardHeader>
                                <CardTitle>Request a Demo</CardTitle>
                                <CardDescription>Let's talk about your laundry needs.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="company-name">Company Name</Label>
                                        <Input id="company-name" placeholder="Your Company, Inc." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Work Email</Label>
                                        <Input id="email" type="email" placeholder="you@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="team-size">Team Size</Label>
                                        <Input id="team-size" type="number" placeholder="e.g., 50" />
                                    </div>
                                    <Button className="w-full">Submit</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <PublicFooter />
        </div>
    );
}
