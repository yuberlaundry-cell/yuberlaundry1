
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { MapPin, Search, Smartphone } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export default function Hero() {
  const router = useRouter();

  const heroImage = {
      imageUrl: "https://images.unsplash.com/photo-1582735689365-27f72f895995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsYXVuZHJ5JTIwYmFnfGVufDB8fHx8MTc2NTI4MTQyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A smiling woman holding a Yuber Laundry bag",
      imageHint: "laundry bag"
  };

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the postcode here.
    // For this demo, we'll just redirect to the registration page.
    router.push('/auth/register');
  }

  return (
    <section className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter !leading-tight">
            Change the way you laundry
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Home or away, work or weekend - move freely between laundromats and dry cleaners. Schedule pickup for free, in a tap.
          </p>

          <Card className="p-6 mt-8 max-w-md shadow-lg">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-muted-foreground"/> Check if we service your area</h3>
             <form onSubmit={handleCheckCoverage} className="flex gap-2">
                <Input required placeholder="Enter your postcode..." className="h-12 text-base" />
                <Button type="submit" size="lg" className="font-semibold">Check Coverage</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">Currently serving select areas in London, Manchester, and Birmingham.</p>
          </Card>

          <Button size="lg" variant="secondary" className="mt-6 rounded-full font-bold bg-foreground text-background hover:bg-foreground/80">
            <Smartphone className="mr-2 h-5 w-5"/>
            Download the app
          </Button>

        </div>
        <div className="relative hidden lg:block">
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={600}
                height={750}
                className="object-cover rounded-2xl aspect-[4/5]"
                priority
            />
        </div>
      </div>
    </section>
  );
}
