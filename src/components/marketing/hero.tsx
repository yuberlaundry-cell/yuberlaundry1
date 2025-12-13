
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import { MapPin, Search, Smartphone, Sparkles, CheckCircle, Package } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressInput } from "../ui/address-input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// This now reflects the cities managed in the Superadmin's "Service Zones" section.
const serviceableCities = ['london', 'manchester', 'birmingham', 'johannesburg'];

export default function Hero() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);

  const handleAddressSelect = (address: { description: string }) => {
    const addressLower = address.description.toLowerCase();
    setSelectedAddress(address.description);
    // This check simulates looking up the address against the zones defined by the superadmin.
    const isSupported = serviceableCities.some(city => addressLower.includes(city));
    setIsServiceable(isSupported);
  };
  
  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddress === '') {
        toast({
            title: "Please enter an address",
            description: "Start typing your address to see if we service your area.",
            variant: "destructive"
        })
        return;
    }

    if (isServiceable) {
        toast({
            title: "Great news!",
            description: "We service your area. Let's get you signed up.",
            className: "bg-green-100 text-green-800 border-green-200"
        });
        router.push('/auth/register');
    } else {
         toast({
            title: "Sorry!",
            description: "We don't service your area just yet, but we're expanding soon!",
            variant: "destructive"
        });
    }
  }

  const heroImage = PlaceHolderImages.find(p => p.id === 'homepage-hero');

  return (
    <section className="bg-primary/20">
      <div className="container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
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
                  <AddressInput
                    required
                    placeholder="Enter your address..."
                    className="h-12 text-base"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    onAddressSelect={handleAddressSelect}
                  />
                  <Button type="submit" size="lg" className="font-semibold">Check</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">Currently serving select areas in London, Manchester, and Birmingham.</p>
            </Card>

            <Button size="lg" variant="secondary" className="mt-6 rounded-full font-bold bg-foreground text-background hover:bg-foreground/80">
              <Smartphone className="mr-2 h-5 w-5"/>
              Download the app
            </Button>

          </div>
          <div className="relative hidden lg:block aspect-[4/5]">
              {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                />
              )}
              <Card className="absolute top-6 right-6 p-3 backdrop-blur-sm bg-background/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Package className="h-5 w-5 text-muted-foreground"/>
                  </div>
                   <div>
                      <p className="font-semibold">Orders: Received</p>
                      <p className="text-sm text-muted-foreground">10 items</p>
                   </div>
                </div>
              </Card>
               <Card className="absolute bottom-6 left-6 right-6 p-3 backdrop-blur-sm bg-background/80 shadow-lg">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-green-100 rounded-full text-green-700">
                        <Sparkles className="h-5 w-5"/>
                      </div>
                      <div>
                          <p className="font-semibold">Dry Cleaning</p>
                          <p className="text-sm text-muted-foreground">Next available: Tue, 2pm</p>
                      </div>
                   </div>
                   <Badge className="font-bold">+ R99.00</Badge>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

    