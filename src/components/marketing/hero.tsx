
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Card } from "../ui/card";
import { Apple, ShoppingBasket, Tag } from "lucide-react";

export function Hero() {
  const heroImage = {
      imageUrl: "https://images.unsplash.com/photo-1582735689365-27f72f895995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsYXVuZHJ5JTIwYmFnfGVufDB8fHx8MTc2NTI4MTQyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A smiling woman holding a Yuber Laundry bag",
      imageHint: "laundry bag"
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter !leading-tight">
            Change the way you laundry
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Home or away, work or weekend - move freely between laundromats and dry cleaners. Schedule pickup for free, in a tap.
          </p>

          <Card className="p-6 mt-8 max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Schedule your collection in <span className="text-primary">London</span></h3>
                <Button variant="link" className="text-primary">Change</Button>
            </div>
            <RadioGroup defaultValue="time-2" className="space-y-3">
                <Label htmlFor="time-1" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="time-1" id="time-1" />
                    <span className="ml-4 font-medium">Today, 12:00 - 15:00</span>
                </Label>
                <Label htmlFor="time-2" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="time-2" id="time-2" />
                    <span className="ml-4 font-medium">Today, 19:00 - 22:00</span>
                </Label>
            </RadioGroup>
            <Button variant="link" className="mt-3 w-full text-primary">See all available times</Button>
            <Button size="lg" className="w-full mt-3" asChild><Link href="/app/book/address">Continue</Link></Button>
          </Card>

          <Button size="lg" variant="secondary" className="mt-6 rounded-full font-bold bg-foreground text-background hover:bg-foreground/80">
            <Apple className="mr-2 h-5 w-5 fill-current"/>
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
            <Card className="absolute top-12 -left-16 p-2 px-4 shadow-xl">
                <p className="font-semibold text-sm">Orders</p>
            </Card>
             <Card className="absolute top-24 -right-12 p-2 px-4 shadow-xl">
                <p className="font-semibold text-sm">Personal, 15 items</p>
            </Card>
            <Card className="absolute bottom-12 -left-20 p-4 shadow-xl flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                    <ShoppingBasket className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                    <p className="font-semibold">Dry Cleaning +R24.50</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 2pm</p>
                </div>
            </Card>
        </div>
      </div>
    </section>
  );
}
