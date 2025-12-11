
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Card } from "../ui/card";
import { Smartphone, MapPin, Search, Check, Shirt } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { mockTimeSlots, TimeSlot } from "@/lib/mock-data";

const cities = [
    { id: "london", name: "London", country: "United Kingdom" },
    { id: "manchester", name: "Manchester", country: "United Kingdom" },
    { id: "birmingham", name: "Birmingham", country: "United Kingdom" },
    { id: "edinburgh", name: "Edinburgh", country: "Scotland" },
    { id: "glasgow", name: "Glasgow", country: "Scotland" },
];

export default function Hero() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [location, setLocation] = React.useState("London");
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>(mockTimeSlots.today);

  const heroImage = {
      imageUrl: "https://images.unsplash.com/photo-1582735689365-27f72f895995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsYXVuZHJ5JTIwYmFnfGVufDB8fHx8MTc2NTI4MTQyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A smiling woman holding a Yuber Laundry bag",
      imageHint: "laundry bag"
  };

  const displayedSlots = isExpanded ? timeSlots : timeSlots.slice(0, 3);

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
                <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-muted-foreground"/> Schedule your collection in <span className="text-primary">{location}</span></h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="text-primary">Change</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Select your city</DialogTitle>
                            <DialogDescription>Choose where to schedule your pickup</DialogDescription>
                        </DialogHeader>
                        <div className="relative">
                             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                             <Input placeholder="Search for a city..." className="pl-8" />
                        </div>
                        <ScrollArea className="h-72">
                             <RadioGroup value={location.toLowerCase()} onValueChange={(val) => setLocation(cities.find(c => c.id === val)?.name || 'London')} className="space-y-2 pr-4">
                                {cities.map(city => (
                                    <Label key={city.id} htmlFor={city.id} 
                                      className={cn(
                                        "flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50",
                                        location.toLowerCase() === city.name.toLowerCase() && "bg-primary/10 border-primary"
                                      )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value={city.id} id={city.id} className="sr-only" />
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">{city.name}</p>
                                                <p className="text-sm text-muted-foreground">{city.country}</p>
                                            </div>
                                        </div>
                                        {location.toLowerCase() === city.name.toLowerCase() && <Check className="h-5 w-5 text-primary"/>}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
            
            <RadioGroup defaultValue={timeSlots[0].value} className="space-y-3">
                {displayedSlots.map(slot => (
                     <Label key={slot.value} htmlFor={slot.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value={slot.value} id={slot.value} />
                        <span className="ml-4 font-medium">{slot.label}</span>
                    </Label>
                ))}
            </RadioGroup>

            {timeSlots.length > 3 && !isExpanded && (
                <Button variant="link" className="mt-3 w-full text-primary" onClick={() => setIsExpanded(true)}>
                    See all available times
                </Button>
            )}

            <Button size="lg" className="w-full mt-3" asChild><Link href="/auth/register">Continue</Link></Button>
            
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
             <Card className="absolute -top-4 right-4 p-3 shadow-lg flex items-center gap-2">
                <p className="font-semibold text-sm">Orders</p>
                <Badge variant="secondary">Personal, 15 items</Badge>
            </Card>
            <Card className="absolute bottom-16 -left-12 p-3 shadow-lg flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                    <Shirt className="h-5 w-5" />
                </div>
                <div>
                    <p className="font-semibold text-sm">Dry Cleaning + R24.50</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2pm</p>
                </div>
            </Card>
        </div>
      </div>
    </section>
  );
}
