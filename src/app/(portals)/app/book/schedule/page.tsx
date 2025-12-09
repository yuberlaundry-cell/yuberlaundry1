'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format, addDays } from 'date-fns';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        dates.push(addDays(today, i));
    }
    return dates;
}

const pickupTimes = ['09:00 - 11:00', '12:00 - 14:00', '15:00 - 17:00', '18:00 - 20:00'];
const deliveryTimes = ['12:00 - 14:00', '15:00 - 17:00', '18:00 - 20:00', '20:00 - 22:00'];

export default function SchedulePage() {
    const dates = generateDates();
    const [selectedPickupDate, setSelectedPickupDate] = useState(dates[0]);
    const [selectedPickupTime, setSelectedPickupTime] = useState(pickupTimes[1]);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(addDays(dates[0], 2));
    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(deliveryTimes[0]);

    return (
        <BookingLayout
            stepTitle="Schedule Pickup & Delivery"
            stepDescription="Choose a convenient time for us to collect and return your laundry."
            nextHref="/app/book/services"
            backHref="/app/book/address"
        >
            <div className="grid md:grid-cols-2 gap-8">
                {/* Pickup Section */}
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Pickup</h3>
                    <div>
                        <Label className="mb-2 block">Date</Label>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-2 pb-2">
                                {dates.map(date => (
                                    <Button
                                        key={date.toISOString()}
                                        variant={format(selectedPickupDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? "default" : "outline"}
                                        onClick={() => setSelectedPickupDate(date)}
                                        className="w-24 flex-shrink-0"
                                    >
                                        <div className="text-center">
                                            <p className="text-sm font-bold">{format(date, 'EEE')}</p>
                                            <p className="text-xs">{format(date, 'MMM d')}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div>
                        <Label className="mb-2 block">Time</Label>
                        <RadioGroup value={selectedPickupTime} onValueChange={setSelectedPickupTime} className="grid grid-cols-2 gap-2">
                            {pickupTimes.map(time => (
                                <Label key={time} htmlFor={`pickup-${time}`} className={cn("block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50", { "border-primary bg-primary/5": selectedPickupTime === time })}>
                                     <RadioGroupItem value={time} id={`pickup-${time}`} className="sr-only"/>
                                    <span className="font-medium text-sm">{time}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                         <Button variant="link" className="mt-2 w-full text-primary">See all available times</Button>
                    </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Delivery</h3>
                    <div>
                        <Label className="mb-2 block">Date</Label>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-2 pb-2">
                                {dates.slice(1).map(date => ( // Delivery can't be same day
                                    <Button
                                        key={date.toISOString()}
                                        variant={format(selectedDeliveryDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? "default" : "outline"}
                                        onClick={() => setSelectedDeliveryDate(date)}
                                        className="w-24 flex-shrink-0"
                                    >
                                        <div className="text-center">
                                            <p className="text-sm font-bold">{format(date, 'EEE')}</p>
                                            <p className="text-xs">{format(date, 'MMM d')}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div>
                        <Label className="mb-2 block">Time</Label>
                        <RadioGroup value={selectedDeliveryTime} onValueChange={setSelectedDeliveryTime} className="grid grid-cols-2 gap-2">
                            {deliveryTimes.map(time => (
                                <Label key={time} htmlFor={`delivery-${time}`} className={cn("block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50", { "border-primary bg-primary/5": selectedDeliveryTime === time })}>
                                     <RadioGroupItem value={time} id={`delivery-${time}`} className="sr-only"/>
                                    <span className="font-medium text-sm">{time}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                         <Button variant="link" className="mt-2 w-full text-primary">See all available times</Button>
                    </div>
                </div>
            </div>
        </BookingLayout>
    );
}
