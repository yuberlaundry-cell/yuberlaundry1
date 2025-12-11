
'use client';

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Zap, Users, BarChart, Building, Briefcase, FileText, Utensils, Dumbbell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const features = [
    {
        icon: FileText,
        title: "Centralized Billing",
        description: "Receive a single, simple invoice for your entire company's usage each month."
    },
    {
        icon: BarChart,
        title: "Usage Reports",
        description: "Get detailed analytics on spending by employee, department, or service type."
    },
    {
        icon: Briefcase,
        title: "Employee Allowances",
        description: "Set custom spending limits and rules for each employee to control your budget."
    },
    {
        icon: Building,
        title: "Dedicated Portal",
        description: "Manage your account, employees, and settings from a simple, powerful admin dashboard."
    }
];

const industries = [
    {
        icon: Briefcase,
        title: "Corporates",
        description: "Offer a modern wellness perk to your office-based or remote employees."
    },
    {
        icon: Building,
        title: "Hotels & Guesthouses",
        description: "Outsource guest laundry and staff uniform cleaning with reliable turnaround."
    },
    {
        icon: Utensils,
        title: "Restaurants",
        description: "Keep your table linens, aprons, and uniforms pristine and ready for service."
    },
    {
        icon: Dumbbell,
        title: "Gyms & Salons",
        description: "Ensure a constant supply of fresh, clean towels for your members and clients."
    }
];


export default function ForBusinessPage() {
    const { toast } = useToast();

    const handleDemoRequest = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Demo Requested",
            description: "Our sales team will be in touch with you shortly.",
        });
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicHeader />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary text-primary-foreground">
                    <div className="container mx-auto px-6 sm:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight">
                                The employee benefit that actually gives time back.
                            </h1>
                            <p className="mt-6 text-lg md:text-xl max-w-lg mx-auto md:mx-0 text-primary-foreground/90">
                                Empower your team with the ultimate convenience. Yuber for Business simplifies laundry so your employees can focus on what matters most.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="#contact">Request a Demo</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                                     <Link href="#features">See Features <ArrowRight className="ml-2"/></Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                           <Image
                                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBvZmZpY2V8ZW58MHx8fHwxNzY1MjgxNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Modern office environment"
                                data-ai-hint="modern office"
                                fill
                                className="object-cover"
                           />
                        </div>
                    </div>
                </section>

                 {/* How it works Section */}
                 <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 sm:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">How it Works</h2>
                        </div>
                        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                                    <span className="font-bold text-2xl">1</span>
                                </div>
                                <h3 className="text-xl font-semibold">Onboard Your Team</h3>
                                <p className="mt-2 text-muted-foreground">Easily add employees and set individual laundry allowances through your dedicated admin portal.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                                     <span className="font-bold text-2xl">2</span>
                                </div>
                                <h3 className="text-xl font-semibold">Employees Book Service</h3>
                                <p className="mt-2 text-muted-foreground">Your team members use their allowance to schedule laundry and dry cleaning via the Yuber app.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                                    <span className="font-bold text-2xl">3</span>
                                </div>
                                <h3 className="text-xl font-semibold">Track & Pay Centrally</h3>
                                <p className="mt-2 text-muted-foreground">Monitor company-wide usage and receive a single, consolidated invoice each month.</p>
                            </div>
                        </div>
                    </div>
                 </section>

                {/* Platform Features Section */}
                <section id="features" className="py-16 md:py-24 bg-card">
                     <div className="container mx-auto px-6 sm:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">A control center for your business</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Everything you need to manage your company’s laundry benefit efficiently.
                            </p>
                        </div>
                         <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map(feature => (
                                <div key={feature.title}>
                                    <feature.icon className="h-8 w-8 text-primary mb-4"/>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                 {/* Solutions Section */}
                <section id="solutions" className="py-16 md:py-24">
                     <div className="container mx-auto px-6 sm:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">Tailored for your industry</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                From corporate offices to hotels, we provide reliable laundry solutions that fit your business needs.
                            </p>
                        </div>
                         <div className="mt-12 grid gap-8 md:grid-cols-2">
                            {industries.map(industry => (
                                <Card key={industry.title} className="flex items-center p-6 gap-6 hover:shadow-lg transition-shadow">
                                    <div className="bg-primary/10 text-primary rounded-lg p-4">
                                        <industry.icon className="h-8 w-8"/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{industry.title}</h3>
                                        <p className="text-muted-foreground">{industry.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section id="contact" className="py-16 md:py-24 bg-primary/5">
                    <div className="container mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                             <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to get started?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Fill out the form to get in touch with our sales team. We'll walk you through the platform and create a custom plan for your business.
                            </p>
                             <ul className="mt-6 space-y-4 text-muted-foreground">
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> A personalized demo of the platform.</li>
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> Custom pricing for your team size.</li>
                                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary"/> Answers to all your questions.</li>
                             </ul>
                        </div>
                         <Card className="shadow-2xl">
                            <CardHeader>
                                <CardTitle>Request a Demo</CardTitle>
                                <CardDescription>Let's talk about your laundry needs.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4" onSubmit={handleDemoRequest}>
                                    <div className="space-y-2">
                                        <Label htmlFor="company-name">Company Name</Label>
                                        <Input id="company-name" placeholder="Your Company, Inc." required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Work Email</Label>
                                        <Input id="email" type="email" placeholder="you@company.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="team-size">Team Size</Label>
                                        <Input id="team-size" type="number" placeholder="e.g., 50" required />
                                    </div>
                                    <Button type="submit" className="w-full">Submit Request</Button>
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
