
'use client';

import { useState } from "react";
import Image from "next/image";
import { OrderSummary } from "./order-summary";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Home, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingFlow() {
    const [addressType, setAddressType] = useState('home');

    return (
        <>
            <div className="col-span-2 p-8 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold font-headline">Book Your Service</h1>
                        <p className="text-muted-foreground">Securely enter your address to get started.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="address">Find your address</Label>
                            <Input id="address" placeholder="Start typing your address..." defaultValue="123 Main Street, Anytown" />
                        </div>

                        <div>
                            <Label>Choose address type</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Button variant="outline" className={cn("flex items-center justify-center h-12", addressType === 'home' && "border-primary bg-primary/10")} onClick={() => setAddressType('home')}>
                                    <Home className="mr-2 h-4 w-4" /> Home
                                </Button>
                                <Button variant="outline" className={cn("flex items-center justify-center h-12", addressType === 'work' && "border-primary bg-primary/10")} onClick={() => setAddressType('work')}>
                                    <Briefcase className="mr-2 h-4 w-4" /> Work
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="flat">Flat / Floor (Optional)</Label>
                                <Input id="flat" />
                            </div>
                             <div>
                                <Label htmlFor="business">Business Name (Optional)</Label>
                                <Input id="business" />
                            </div>
                        </div>

                        <div>
                            <Label>Add delivery notes</Label>
                            <Textarea placeholder="e.g. Please ring the bell twice" className="mt-2" />
                        </div>

                        <div>
                            <Label>Help us find your building entrance</Label>
                            <p className="text-sm text-muted-foreground">Drag the pin on the map to specify the exact entrance for our driver.</p>
                            <div className="mt-2 w-full aspect-video bg-muted rounded-lg overflow-hidden relative flex items-center justify-center">
                                <p className="text-muted-foreground z-10">Map placeholder</p>
                                <Image 
                                    src="https://picsum.photos/seed/map/600/400"
                                    alt="Map placeholder"
                                    fill
                                    className="object-cover opacity-20"
                                    data-ai-hint="map"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-span-1 bg-muted/50 p-8 overflow-y-auto border-l">
                <OrderSummary />
                <div className="flex justify-between items-center mt-8">
                     <Button variant="ghost">Go Back</Button>
                     <Button>Continue</Button>
                </div>
            </div>
        </>
    )
}
